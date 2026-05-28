import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import { createToken, ROLE_HOME } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!rateLimit(ip, 3, 60000)) {
      return NextResponse.json({ success: false, message: "Muitas tentativas. Tente novamente em 1 minuto." }, { status: 429 });
    }

    const { email, password, nome, segmento } = await request.json();

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name: nome, role: "manager" } },
    });

    if (authError || !authData.user) {
      return NextResponse.json({ success: false, message: authError?.message || "Erro ao criar conta." }, { status: 400 });
    }

    // Create profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      email,
      name: nome,
      role: "manager",
    });

    if (profileError) {
      return NextResponse.json({ success: false, message: "Erro ao criar perfil." }, { status: 500 });
    }

    const token = await createToken(authData.user.id, email, "manager", nome);
    const cookieStore = await cookies();
    cookieStore.set("vitaone_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 86400 });

    return NextResponse.json({
      success: true,
      user: { id: authData.user.id, email, name: nome, role: "manager" },
      redirectTo: ROLE_HOME["manager"],
      message: "Conta criada com sucesso!",
    });
  } catch {
    return NextResponse.json({ success: false, message: "Erro interno no servidor." }, { status: 500 });
  }
}
