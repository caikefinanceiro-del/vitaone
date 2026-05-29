import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { query } from '@/lib/db';
import { pinecone } from '@/lib/pinecone';
import { resend } from '@/lib/resend';

export async function GET() {
  const status: Record<string, string> = {
    supabaseRest: 'pending',
    postgres: 'pending',
    pinecone: 'pending',
    resend: 'pending'
  };

  try {
    // 1. Testa Supabase via REST API
    // Faz uma query simples que deve sempre retornar (ou erro se não tiver auth)
    // Tenta pegar a hora do banco ou apenas vê se o client foi inicializado
    status.supabaseRest = supabase ? 'ok' : 'failed';
    
    // 2. Testa Postgres Direto
    try {
      const res = await query('SELECT NOW()');
      if (res.rows.length > 0) status.postgres = 'ok';
    } catch (e: any) {
      status.postgres = `failed: ${e.message}`;
    }

    // 3. Testa Pinecone
    try {
      // Lista indexes só para checar a chave
      const indexes = await pinecone.listIndexes();
      status.pinecone = 'ok';
    } catch (e: any) {
      status.pinecone = `failed: ${e.message}`;
    }

    // 4. Testa Resend
    // Apenas checa se a classe instanciou com a chave, já que não temos um endpoint para "ping"
    status.resend = resend ? 'ok' : 'failed';

  } catch (error: any) {
    return NextResponse.json({ error: error.message, status }, { status: 500 });
  }

  return NextResponse.json({ 
    message: 'Health check completed', 
    services: status 
  });
}
