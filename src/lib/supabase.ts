import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente padrão (com anon_key) para uso geral no frontend
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função para criar um cliente com privilégios administrativos (Service Role)
// IMPORTANTE: Use apenas em Server Components, Server Actions ou Route Handlers!
export const getSupabaseAdmin = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY não está definida.');
  }
  return createClient(supabaseUrl, serviceRoleKey);
};
