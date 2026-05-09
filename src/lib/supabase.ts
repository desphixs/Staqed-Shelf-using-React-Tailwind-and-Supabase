import { createClient } from '@supabase/supabase-js'



// 1. Replace these with your actual Supabase Project URL and Anon Key
// You can find these in your Supabase Dashboard under Settings > API
const supabaseUrl: any = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey: any = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured: any = Boolean(supabaseUrl && supabaseAnonKey)

// 2. Initialize the Supabase client safely
export const supabase: any = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
