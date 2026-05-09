import { createClient } from '@supabase/supabase-js'

// 1. Replace these with your actual Supabase Project URL and Anon Key
// You can find these in your Supabase Dashboard under Settings > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 2. Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
