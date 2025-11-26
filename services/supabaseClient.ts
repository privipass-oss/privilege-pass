// services/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Credenciais do seu projeto Supabase (produção)
const SUPABASE_URL = 'https://xzboeqhfqumccugkirth.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6Ym9lcWhmcXVtY2N1Z2tpcnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5OTc0NTEsImV4cCI6MjA3OTU3MzQ1MX0.2ZRgDzJkOg38KrWVlV-Waz9JEvDrsxwoaZyABEc6HzI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
