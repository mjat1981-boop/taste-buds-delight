import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionToken, SESSION_COOKIE } from "@/lib/admin-auth";
import { checkRateLimit } from "@/lib/rate-limit";

const LOGIN_ATTEMPT_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// A per-IP key only helps behind a trusted proxy that sets/overwrites
// x-forwarded-for itself — a caller hitting the app directly (or through
// a proxy that just forwards whatever header it received) can vary that
// value on every request and get a fresh bucket each time. A shared
// global bucket bounds total attempts regardless, so varying the header
// can't fully bypass the limit even in that case.
const GLOBAL_ATTEMPT_LIMIT = 30;
const GLOBAL_LOGIN_KEY = "admin-login:global";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const withinGlobalLimit = checkRateLimit(GLOBAL_LOGIN_KEY, GLOBAL_ATTEMPT_LIMIT, LOGIN_WINDOW_MS);
  const withinIpLimit = checkRateLimit(`admin-login:${ip}`, LOGIN_ATTEMPT_LIMIT, LOGIN_WINDOW_MS);

  if (!withinGlobalLimit || !withinIpLimit) {
    return NextResponse.json(
      { error: "Too many login attempts. Try again later." },
      { status: 429 }
    );
  }

  const body = await request.json() as { password?: string };
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json({ error: "Admin password not configured" }, { status: 500 });
  }

  if (body.password !== adminPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return NextResponse.json({ success: true });
}
