import { Pool } from 'pg';

// Fallback to avoid errors if DATABASE_URL is not set in some environments
const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
  // Opções adicionais caso precise rodar em produção (SSL, etc)
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
});

// Helper function para executar queries simples
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
