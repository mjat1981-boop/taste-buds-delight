import { NextRequest } from "next/server";

export function isAuthorizedAdmin(request: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;

  const cookie = request.cookies.get("tbd_admin")?.value;
  return cookie === adminPassword;
}
