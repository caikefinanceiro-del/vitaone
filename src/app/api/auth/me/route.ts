import { NextResponse } from "next/server";
import { verifyToken, getTokenFromCookie } from "@/lib/auth";

export async function GET(request: Request) {
  const token = getTokenFromCookie(request);
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Não autenticado." },
      { status: 401 }
    );
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json(
      { success: false, message: "Token inválido." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      clinicId: payload.clinicId,
    },
  });
}
