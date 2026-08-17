import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are valid and non-placeholder
export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawAnonKey &&
  rawUrl !== 'https://your-supabase-project.supabase.co' &&
  !rawUrl.includes('your-supabase-project')
);

// Fallback dummy values to prevent runtime client initialization crashes when environment variables are not yet populated
const supabaseUrl = isSupabaseConfigured
  ? rawUrl!
  : 'https://placeholder.supabase.co';

const supabaseAnonKey = isSupabaseConfigured
  ? rawAnonKey!
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
