import { NextRequest } from "next/server";

const SESSION_COOKIE = "tbd_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function sign(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return toHex(signature);
}

// Creates an opaque, expiring, HMAC-signed session token so the admin
// cookie never carries the plaintext password itself.
export async function createSessionToken(): Promise<string> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) throw new Error("ADMIN_PASSWORD not configured");

  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `${expires}`;
  const signature = await sign(payload, adminPassword);
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expires = Number(payload);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  const expected = await sign(payload, adminPassword);
  return timingSafeEqual(expected, signature);
}

export async function isAuthorizedAdmin(request: NextRequest): Promise<boolean> {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export { SESSION_COOKIE };
