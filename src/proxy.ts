import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, COOKIE_NAME, ROLE_HOME } from "@/lib/auth";

const PUBLIC_ROUTES = ["/", "/api/auth/login", "/api/auth/register"];

const ROLE_PREFIXES: Record<string, string> = {
  admin_master: "/admin",
  manager: "/empresa",
  reception: "/colaborador",
  professional: "/colaborador",
  client: "/cliente",
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const payload = await verifyToken(token);
  if (!payload) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  const allowedPrefix = ROLE_PREFIXES[payload.role];
  if (allowedPrefix && !pathname.startsWith(allowedPrefix) && !pathname.startsWith("/api/") && !pathname.startsWith("/_next/")) {
    const home = ROLE_HOME[payload.role] || "/";
    return NextResponse.redirect(new URL(home, request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-vitaone-user-role", payload.role);
  requestHeaders.set("x-vitaone-user-name", payload.name);
  requestHeaders.set("x-vitaone-user-email", payload.email);
  requestHeaders.set("x-vitaone-user-id", payload.sub || "");
  if (payload.clinicId) {
    requestHeaders.set("x-vitaone-clinic-id", payload.clinicId);
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
