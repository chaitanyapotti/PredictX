import { createClient } from '@supabase/supabase-js';

const postgressUrl = process.env.POSTGRES_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!postgressUrl || !supabaseKey) {
  throw new Error('POSTGRES_URL or SUPABASE_KEY is not defined');
}

export const supabaseDBClient = createClient("https://itoitewdefnhiyadjywv.supabase.co", supabaseKey); 
