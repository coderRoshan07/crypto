import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, testSupabaseConnection } from '../lib/supabase';

// Database types
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

interface DataContextType {
  tools: CryptoTool[];
  icos: ICOProject[];
  propFirms: PropFirm[];
  loading: boolean;
  isSupabaseConnected: boolean;
  connectionError: string | null;
  addTool: (tool: Omit<CryptoTool, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  addICO: (ico: Omit<ICOProject, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  addPropFirm: (firm: Omit<PropFirm, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateTool: (id: string, tool: Partial<CryptoTool>) => Promise<void>;
  updateICO: (id: string, ico: Partial<ICOProject>) => Promise<void>;
  updatePropFirm: (id: string, firm: Partial<PropFirm>) => Promise<void>;
  deleteTool: (id: string) => Promise<void>;
  deleteICO: (id: string) => Promise<void>;
  deletePropFirm: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [tools, setTools] = useState<CryptoTool[]>([]);
  const [icos, setIcos] = useState<ICOProject[]>([]);
  const [propFirms, setPropFirms] = useState<PropFirm[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setConnectionError(null);
      
      // Test Supabase connection
      const connected = await testSupabaseConnection();
      setIsSupabaseConnected(connected);
      
      if (!connected) {
        // Load demo data when Supabase is not connected
        setTools(getDemoTools());
        setIcos(getDemoICOs());
        setPropFirms(getDemoPropFirms());
        return;
      }

      // Fetch data from Supabase
      const [toolsResponse, icosResponse, propFirmsResponse] = await Promise.all([
        supabase.from('crypto_tools').select('*').order('created_at', { ascending: false }),
        supabase.from('ico_projects').select('*').order('created_at', { ascending: false }),
        supabase.from('prop_firms').select('*').order('created_at', { ascending: false })
      ]);

      if (toolsResponse.error) throw toolsResponse.error;
      if (icosResponse.error) throw icosResponse.error;
      if (propFirmsResponse.error) throw propFirmsResponse.error;

      setTools(toolsResponse.data || []);
      setIcos(icosResponse.data || []);
      setPropFirms(propFirmsResponse.data || []);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setConnectionError(`Database error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      // Load demo data on error
      setTools(getDemoTools());
      setIcos(getDemoICOs());
      setPropFirms(getDemoPropFirms());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTool = async (tool: Omit<CryptoTool, 'id' | 'created_at' | 'updated_at'>) => {
    if (!isSupabaseConnected) {
      // Add to demo data when Supabase is not connected
      const newTool: CryptoTool = {
        ...tool,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setTools(prev => [newTool, ...prev]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('crypto_tools')
        .insert([tool])
        .select()
        .single();

      if (error) throw error;
      setTools(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error adding tool:', error);
      throw error;
    }
  };

  const addICO = async (ico: Omit<ICOProject, 'id' | 'created_at' | 'updated_at'>) => {
    if (!isSupabaseConnected) {
      // Add to demo data when Supabase is not connected
      const newICO: ICOProject = {
        ...ico,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setIcos(prev => [newICO, ...prev]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('ico_projects')
        .insert([ico])
        .select()
        .single();

      if (error) throw error;
      setIcos(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error adding ICO:', error);
      throw error;
    }
  };

  const addPropFirm = async (firm: Omit<PropFirm, 'id' | 'created_at' | 'updated_at'>) => {
    if (!isSupabaseConnected) {
      // Add to demo data when Supabase is not connected
      const newFirm: PropFirm = {
        ...firm,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setPropFirms(prev => [newFirm, ...prev]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('prop_firms')
        .insert([firm])
        .select()
        .single();

      if (error) throw error;
      setPropFirms(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error adding prop firm:', error);
      throw error;
    }
  };

  const updateTool = async (id: string, updates: Partial<CryptoTool>) => {
    if (!isSupabaseConnected) {
      // Update demo data when Supabase is not connected
      setTools(prev => prev.map(tool => 
        tool.id === id 
          ? { ...tool, ...updates, updated_at: new Date().toISOString() }
          : tool
      ));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('crypto_tools')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTools(prev => prev.map(tool => tool.id === id ? data : tool));
    } catch (error) {
      console.error('Error updating tool:', error);
      throw error;
    }
  };

  const updateICO = async (id: string, updates: Partial<ICOProject>) => {
    if (!isSupabaseConnected) {
      // Update demo data when Supabase is not connected
      setIcos(prev => prev.map(ico => 
        ico.id === id 
          ? { ...ico, ...updates, updated_at: new Date().toISOString() }
          : ico
      ));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('ico_projects')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setIcos(prev => prev.map(ico => ico.id === id ? data : ico));
    } catch (error) {
      console.error('Error updating ICO:', error);
      throw error;
    }
  };

  const updatePropFirm = async (id: string, updates: Partial<PropFirm>) => {
    if (!isSupabaseConnected) {
      // Update demo data when Supabase is not connected
      setPropFirms(prev => prev.map(firm => 
        firm.id === id 
          ? { ...firm, ...updates, updated_at: new Date().toISOString() }
          : firm
      ));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('prop_firms')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setPropFirms(prev => prev.map(firm => firm.id === id ? data : firm));
    } catch (error) {
      console.error('Error updating prop firm:', error);
      throw error;
    }
  };

  const deleteTool = async (id: string) => {
    if (!isSupabaseConnected) {
      // Delete from demo data when Supabase is not connected
      setTools(prev => prev.filter(tool => tool.id !== id));
      return;
    }

    try {
      const { error } = await supabase
        .from('crypto_tools')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTools(prev => prev.filter(tool => tool.id !== id));
    } catch (error) {
      console.error('Error deleting tool:', error);
      throw error;
    }
  };

  const deleteICO = async (id: string) => {
    if (!isSupabaseConnected) {
      // Delete from demo data when Supabase is not connected
      setIcos(prev => prev.filter(ico => ico.id !== id));
      return;
    }

    try {
      const { error } = await supabase
        .from('ico_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setIcos(prev => prev.filter(ico => ico.id !== id));
    } catch (error) {
      console.error('Error deleting ICO:', error);
      throw error;
    }
  };

  const deletePropFirm = async (id: string) => {
    if (!isSupabaseConnected) {
      // Delete from demo data when Supabase is not connected
      setPropFirms(prev => prev.filter(firm => firm.id !== id));
      return;
    }

    try {
      const { error } = await supabase
        .from('prop_firms')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPropFirms(prev => prev.filter(firm => firm.id !== id));
    } catch (error) {
      console.error('Error deleting prop firm:', error);
      throw error;
    }
  };

  const refreshData = async () => {
    await fetchData();
  };

  return (
    <DataContext.Provider value={{
      tools,
      icos,
      propFirms,
      loading,
      isSupabaseConnected,
      connectionError,
      addTool,
      addICO,
      addPropFirm,
      updateTool,
      updateICO,
      updatePropFirm,
      deleteTool,
      deleteICO,
      deletePropFirm,
      refreshData,
    }}>
      {children}
    </DataContext.Provider>
  );
}

// Demo data functions
const getDemoTools = (): CryptoTool[] => [
  {
    id: '1',
    name: 'Crypto Calculator',
    description: 'Calculate crypto conversions and portfolio values in real-time',
    category: 'Trading',
    icon_url: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/32/btc.png',
    premium: false,
    rating: 4.8,
    url: '/tools/crypto-calculator',
    affiliate_url: 'https://example.com/crypto-calc?ref=cryptohub',
    features: ['Real-time prices', 'Portfolio tracking', 'Multi-currency support'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Technical Analysis Suite',
    description: 'Advanced charting tools with 50+ indicators',
    category: 'Analysis',
    icon_url: 'https://s3.tradingview.com/favicon.ico',
    premium: true,
    rating: 4.9,
    url: '/tools/technical-analysis',
    affiliate_url: 'https://tradingview.com?ref=cryptohub',
    features: ['50+ indicators', 'Custom alerts', 'Multi-timeframe analysis'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'DCA Calculator',
    description: 'Dollar Cost Averaging calculator and strategy planner',
    category: 'Portfolio',
    icon_url: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/32/eth.png',
    premium: false,
    rating: 4.7,
    url: '/tools/dca-calculator',
    features: ['Historical backtesting', 'Strategy optimization', 'Risk analysis'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Arbitrage Scanner',
    description: 'Find arbitrage opportunities across exchanges',
    category: 'Trading',
    icon_url: 'https://coinigy.com/favicon.ico',
    premium: true,
    rating: 4.9,
    url: '/tools/arbitrage-scanner',
    affiliate_url: 'https://coinigy.com?ref=cryptohub',
    features: ['Real-time scanning', '20+ exchanges', 'Profit calculations'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const getDemoICOs = (): ICOProject[] => [
  {
    id: '1',
    name: 'QuantumChain',
    symbol: 'QTC',
    description: 'Next-generation blockchain with quantum-resistant security',
    start_date: '2024-02-15',
    end_date: '2024-03-15',
    target: '$50M',
    raised: '$0',
    participants: 0,
    rating: 4.8,
    category: 'Infrastructure',
    icon_url: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/32/qtum.png',
    status: 'upcoming',
    website: 'https://quantumchain.io',
    social: { twitter: 'https://twitter.com/quantumchain', telegram: 'https://t.me/quantumchain' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'GreenEnergy Coin',
    symbol: 'GEC',
    description: 'Sustainable blockchain for renewable energy trading',
    start_date: '2024-01-15',
    end_date: '2024-02-15',
    target: '$40M',
    raised: '$28M',
    participants: 15420,
    rating: 4.7,
    category: 'Sustainability',
    icon_url: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/32/enj.png',
    status: 'active',
    website: 'https://greenenergycoin.io',
    social: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const getDemoPropFirms = (): PropFirm[] => [
  {
    id: '1',
    name: 'FTMO',
    icon_url: 'https://ftmo.com/favicon.ico',
    description: 'Leading prop trading firm with excellent profit splits and trading conditions',
    min_capital: '$10,000',
    max_capital: '$400,000',
    profit_split: '80%',
    max_drawdown: '10%',
    trading_period: '30 days',
    challenge: true,
    instruments: ['Forex', 'Indices', 'Commodities', 'Crypto'],
    rating: 4.8,
    reviews: 2340,
    features: ['No time limit', 'Weekend holding allowed', 'Expert advisors allowed'],
    offers: ['Free retries on challenge', '14-day money back guarantee', 'Bi-weekly payouts'],
    highlights: ['Most trusted prop firm', 'Over 200,000 traders funded', 'Regulated by CySEC'],
    website: 'https://ftmo.com',
    affiliate_url: 'https://ftmo.com?ref=cryptohub',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'MyForexFunds',
    icon_url: 'https://myforexfunds.com/favicon.ico',
    description: 'Fast-growing prop firm with competitive terms and quick payouts',
    min_capital: '$5,000',
    max_capital: '$300,000',
    profit_split: '75%',
    max_drawdown: '8%',
    trading_period: 'Unlimited',
    challenge: true,
    instruments: ['Forex', 'Indices', 'Commodities'],
    rating: 4.6,
    reviews: 1820,
    features: ['Rapid verification', 'Multiple account sizes', 'No minimum trading days'],
    offers: ['50% discount on challenges', 'Instant funding after passing', 'Weekly payouts'],
    highlights: ['Fastest growing prop firm', 'Same day payouts', '24/7 support'],
    website: 'https://myforexfunds.com',
    affiliate_url: 'https://myforexfunds.com?ref=cryptohub',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}