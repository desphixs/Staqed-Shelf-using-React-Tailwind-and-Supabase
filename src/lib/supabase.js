import { createClient } from '@supabase/supabase-js'

// 1. Replace these with your actual Supabase Project URL and Anon Key
// You can find these in your Supabase Dashboard under Settings > API
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

// 2. Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
