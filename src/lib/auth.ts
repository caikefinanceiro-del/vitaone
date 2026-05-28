import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { type Role } from "./types";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "vitaone-dev-secret-key-2026"
);

const COOKIE_NAME = "vitaone_token";

export interface TokenPayload extends JWTPayload {
  role: Role;
  email: string;
  name: string;
  clinicId?: string;
}

export async function createToken(
  userId: string,
  email: string,
  role: Role,
  name: string,
  clinicId?: string
): Promise<string> {
  return new SignJWT({ role, email, name, clinicId } satisfies TokenPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET);
}

export async function verifyToken(
  token: string
): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as TokenPayload;
  } catch {
    return null;
  }
}

export function getTokenFromCookie(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    const [name, ...rest] = cookie.split("=");
    if (name === COOKIE_NAME) return rest.join("=");
  }
  return null;
}

export const ROLE_HOME: Record<string, string> = {
  admin_master: "/admin/dashboard",
  manager: "/empresa/dashboard",
  reception: "/colaborador/reception/agenda",
  professional: "/colaborador/professional/workday",
  client: "/cliente/appointments",
};

export { COOKIE_NAME };
