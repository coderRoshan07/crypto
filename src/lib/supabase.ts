import { createClient } from '@supabase/supabase-js';

// These will be set when you connect to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test Supabase connection
export const testSupabaseConnection = async () => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return false;
    }
    
    const { data, error } = await supabase
      .from('crypto_tools')
      .select('id')
      .limit(1);
    
    return !error;
  } catch (error) {
    console.log('Supabase connection test failed:', error);
    return false;
  }
};