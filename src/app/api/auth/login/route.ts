import { NextResponse } from "next/server";
import { createToken, ROLE_HOME } from "@/lib/auth";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";

interface SeedUser {
  id: string;
  email: string;
  password: string;
  role: "admin_master" | "manager" | "reception" | "professional" | "client";
  name: string;
  avatar: string;
  clinicId?: string;
}

const USERS: SeedUser[] = [
  { 
    id: "1", 
    email: "caike.financeiro@gmail.com", 
    password: "142536Drade@", 
    role: "admin_master", 
    name: "Caike Admin", 
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOgI4OKSNweRVkLlLk2VMaLYWZlHOnj4iQPY4_DA0IS--DkOnA-SsAb0FcR2jKnOpoZxw9iijoiPa5voM7zMj9ksClvYD5X3z_F7CYgsy9anK7mkAt8HbkLTyyi0y7YkfTvIvujNaDt0sdksmDaZAjgm_keZVvZhl8A3L54rC2iwnGfOIUjpQiOiUGqwZtzLcfDfpg_BawfXIZGhbFGpt6TNZqDbH8Zyxlti-AZ6K0ZRpNj1T_UZ5BoF15WpN2UrniaKmqrG-4LtGz" 
  },
  { 
    id: "2", 
    email: "gestor@clinica.com", 
    password: "123456", 
    role: "manager", 
    name: "Dr. Roberto Gestor", 
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZBGiILKHEAld-QUP-kVicO_KHV670qlnCfwLBQ_bQ7m1NV1NrBmtJ4sRhM1PD1fvA-F2IRE6i_hSIpmitFBcuZ0vBb903t59yZYPylYUZQ85oRSs-YTy5MCrQcWSyyGOJnLmeJOLCEUGsqUR4cktq5TAyIgqR6temmzqMYI69_TLj_tbPcdQGJHYnmkL7iBHe1kRbU8yPB6Hb6DFh44mWpvPel4nnATxGzgSSnB1Gnat99R0XsEYeNOw-kgPKBCCaF5t2Z4j7ccw9", 
    clinicId: "clinic_1" 
  },
  {
    id: "3",
    email: "cliente@vitaone.com.br",
    password: "123456",
    role: "client",
    name: "Maria Paciente",
    avatar: ""
  },
];

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!rateLimit(ip, 5, 60000)) {
      return NextResponse.json({ success: false, message: "Muitas tentativas. Tente novamente em 1 minuto." }, { status: 429 });
    }

    const { email, password } = await request.json();

    // Fallback to hardcoded users first for better UX during dev
    const user = USERS.find((u) => u.email === email && u.password === password);
    if (user) {
      const token = await createToken(user.id, user.email, user.role, user.name, user.clinicId);
      const cookieStore = await cookies();
      cookieStore.set("vitaone_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 86400 });

      return NextResponse.json({
        success: true,
        user: { id: user.id, email: user.email, name: user.name, role: user.role, avatar: user.avatar, clinicId: user.clinicId },
        redirectTo: ROLE_HOME[user.role],
        message: "Login efetuado com sucesso.",
      });
    }

    // Try Supabase Auth
    const { data: sbData, error: sbError } = await supabase.auth.signInWithPassword({ email, password });

    if (sbData?.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", sbData.user.id)
        .single();

      if (profile) {
        const token = await createToken(profile.id, profile.email!, profile.role, profile.name, profile.clinic_id);
        const cookieStore = await cookies();
        cookieStore.set("vitaone_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 86400 });

        return NextResponse.json({
          success: true,
          user: { id: profile.id, email: profile.email, name: profile.name, role: profile.role, avatar: profile.avatar_url, clinicId: profile.clinic_id },
          redirectTo: ROLE_HOME[profile.role],
          message: "Login efetuado com sucesso.",
        });
      }
    }

    return NextResponse.json({ success: false, message: "E-mail ou senha incorretos." }, { status: 401 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erro interno no servidor.";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
