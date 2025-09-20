import { createClient } from '@supabase/supabase-js';

// These will be set when you connect to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types matching exact schema
export interface CryptoTool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon_url: string;
  premium: boolean;
  rating: number;
  url: string;
  affiliate_url?: string;
  features: string[];
  created_at: string;
  updated_at: string;
}

export interface ICOProject {
  id: string;
  name: string;
  symbol: string;
  description: string;
  start_date: string;
  end_date: string;
  target: string;
  raised: string;
  participants: number;
  rating: number;
  category: string;
  icon_url: string;
  status: 'upcoming' | 'active' | 'completed';
  website?: string;
  whitepaper?: string;
  social?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface PropFirm {
  id: string;
  name: string;
  icon_url: string;
  description: string;
  min_capital: string;
  max_capital: string;
  profit_split: string;
  max_drawdown: string;
  trading_period: string;
  challenge: boolean;
  instruments: string[];
  rating: number;
  reviews: number;
  features: string[];
  offers: string[];
  highlights: string[];
  website?: string;
  affiliate_url?: string;
  created_at: string;
  updated_at: string;
}

// Test Supabase connection
export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('Supabase credentials not found');
      return false;
    }
    
    const { data, error } = await supabase
      .from('crypto_tools')
      .select('id')
      .limit(1);
    
    if (error) {
      console.log('Supabase connection test failed:', error.message);
      return false;
    }
    
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.log('Supabase connection test error:', error);
    return false;
  }
};

// CRUD operations for crypto_tools
export const cryptoToolsAPI = {
  getAll: () => supabase.from('crypto_tools').select('*').order('created_at', { ascending: false }),
  getById: (id: string) => supabase.from('crypto_tools').select('*').eq('id', id).single(),
  create: (data: Omit<CryptoTool, 'id' | 'created_at' | 'updated_at'>) => 
    supabase.from('crypto_tools').insert([data]).select().single(),
  update: (id: string, data: Partial<CryptoTool>) => 
    supabase.from('crypto_tools').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id).select().single(),
  delete: (id: string) => supabase.from('crypto_tools').delete().eq('id', id)
};

// CRUD operations for ico_projects
export const icoProjectsAPI = {
  getAll: () => supabase.from('ico_projects').select('*').order('created_at', { ascending: false }),
  getById: (id: string) => supabase.from('ico_projects').select('*').eq('id', id).single(),
  create: (data: Omit<ICOProject, 'id' | 'created_at' | 'updated_at'>) => 
    supabase.from('ico_projects').insert([data]).select().single(),
  update: (id: string, data: Partial<ICOProject>) => 
    supabase.from('ico_projects').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id).select().single(),
  delete: (id: string) => supabase.from('ico_projects').delete().eq('id', id)
};

// CRUD operations for prop_firms
export const propFirmsAPI = {
  getAll: () => supabase.from('prop_firms').select('*').order('created_at', { ascending: false }),
  getById: (id: string) => supabase.from('prop_firms').select('*').eq('id', id).single(),
  create: (data: Omit<PropFirm, 'id' | 'created_at' | 'updated_at'>) => 
    supabase.from('prop_firms').insert([data]).select().single(),
  update: (id: string, data: Partial<PropFirm>) => 
    supabase.from('prop_firms').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id).select().single(),
  delete: (id: string) => supabase.from('prop_firms').delete().eq('id', id)
};