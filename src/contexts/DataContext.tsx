import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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

  // Load data from localStorage for demo mode
  const loadFromLocalStorage = () => {
    try {
      const storedTools = localStorage.getItem('demo_tools');
      const storedIcos = localStorage.getItem('demo_icos');
      const storedPropFirms = localStorage.getItem('demo_prop_firms');
      
      if (storedTools) setTools(JSON.parse(storedTools));
      if (storedIcos) setIcos(JSON.parse(storedIcos));
      if (storedPropFirms) setPropFirms(JSON.parse(storedPropFirms));
      
      return storedTools || storedIcos || storedPropFirms;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return false;
    }
  };

  // Save data to localStorage for demo mode
  const saveToLocalStorage = (tools: CryptoTool[], icos: ICOProject[], propFirms: PropFirm[]) => {
    try {
      localStorage.setItem('demo_tools', JSON.stringify(tools));
      localStorage.setItem('demo_icos', JSON.stringify(icos));
      localStorage.setItem('demo_prop_firms', JSON.stringify(propFirms));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Check if Supabase is connected
      const { data: testData, error: testError } = await supabase
        .from('crypto_tools')
        .select('id')
        .limit(1);
      
      if (testError) {
        console.log('Supabase not connected, using demo data');
        setIsSupabaseConnected(false);
        
        // Try to load from localStorage first
        const hasStoredData = loadFromLocalStorage();
        if (!hasStoredData) {
          loadDemoData();
        }
      } else {
        console.log('Supabase connected, loading real data');
        setIsSupabaseConnected(true);
        
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
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsSupabaseConnected(false);
      
      // Try to load from localStorage first
      const hasStoredData = loadFromLocalStorage();
      if (!hasStoredData) {
        loadDemoData();
      }
    } finally {
      setLoading(false);
    }
  };

  const loadDemoData = () => {
    // Demo data for when Supabase is not connected
    const demoTools: CryptoTool[] = [
      {
        id: '1',
        name: 'Crypto Calculator',
        description: 'Calculate crypto conversions and portfolio values in real-time',
        category: 'Trading',
        icon_url: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/32/btc.png',
        premium: false,
        rating: 4.8,
        url: 'https://coinmarketcap.com/converter/',
        affiliate_url: 'https://coinmarketcap.com/converter/?ref=cryptohub',
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
        url: 'https://tradingview.com',
        affiliate_url: 'https://tradingview.com?ref=cryptohub',
        features: ['50+ indicators', 'Custom alerts', 'Multi-timeframe analysis'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ];

    const demoICOs: ICOProject[] = [
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
        social: { twitter: 'https://twitter.com/quantumchain' },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ];

    const demoPropFirms: PropFirm[] = [
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
        offers: ['Free retries on challenge', '14-day money back guarantee'],
        highlights: ['Most trusted prop firm', 'Over 200,000 traders funded'],
        website: 'https://ftmo.com',
        affiliate_url: 'https://ftmo.com?ref=cryptohub',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ];

    setTools(demoTools);
    setIcos(demoICOs);
    setPropFirms(demoPropFirms);
    
    // Save initial demo data to localStorage
    saveToLocalStorage(demoTools, demoICOs, demoPropFirms);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTool = async (tool: Omit<CryptoTool, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (isSupabaseConnected) {
        const { data, error } = await supabase
          .from('crypto_tools')
          .insert([tool])
          .select()
          .single();

        if (error) throw error;
        setTools(prev => [data, ...prev]);
      } else {
        // Demo mode - just add to local state
        const newTool: CryptoTool = {
          ...tool,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        const updatedTools = [newTool, ...tools];
        setTools(updatedTools);
        saveToLocalStorage(updatedTools, icos, propFirms);
      }
    } catch (error) {
      console.error('Error adding tool:', error);
      throw error;
    }
  };

  const addICO = async (ico: Omit<ICOProject, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (isSupabaseConnected) {
        const { data, error } = await supabase
          .from('ico_projects')
          .insert([ico])
          .select()
          .single();

        if (error) throw error;
        setIcos(prev => [data, ...prev]);
      } else {
        // Demo mode - just add to local state
        const newICO: ICOProject = {
          ...ico,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        const updatedIcos = [newICO, ...icos];
        setIcos(updatedIcos);
        saveToLocalStorage(tools, updatedIcos, propFirms);
      }
    } catch (error) {
      console.error('Error adding ICO:', error);
      throw error;
    }
  };

  const addPropFirm = async (firm: Omit<PropFirm, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (isSupabaseConnected) {
        const { data, error } = await supabase
          .from('prop_firms')
          .insert([firm])
          .select()
          .single();

        if (error) throw error;
        setPropFirms(prev => [data, ...prev]);
      } else {
        // Demo mode - just add to local state
        const newFirm: PropFirm = {
          ...firm,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        const updatedFirms = [newFirm, ...propFirms];
        setPropFirms(updatedFirms);
        saveToLocalStorage(tools, icos, updatedFirms);
      }
    } catch (error) {
      console.error('Error adding prop firm:', error);
      throw error;
    }
  };

  const updateTool = async (id: string, updates: Partial<CryptoTool>) => {
    try {
      if (isSupabaseConnected) {
        const { data, error } = await supabase
          .from('crypto_tools')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        setTools(prev => prev.map(tool => tool.id === id ? data : tool));
      } else {
        // Demo mode - just update local state
        const updatedTools = tools.map(tool => tool.id === id ? { ...tool, ...updates, updated_at: new Date().toISOString() } : tool);
        setTools(updatedTools);
        saveToLocalStorage(updatedTools, icos, propFirms);
      }
    } catch (error) {
      console.error('Error updating tool:', error);
      throw error;
    }
  };

  const updateICO = async (id: string, updates: Partial<ICOProject>) => {
    try {
      if (isSupabaseConnected) {
        const { data, error } = await supabase
          .from('ico_projects')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        setIcos(prev => prev.map(ico => ico.id === id ? data : ico));
      } else {
        // Demo mode - just update local state
        const updatedIcos = icos.map(ico => ico.id === id ? { ...ico, ...updates, updated_at: new Date().toISOString() } : ico);
        setIcos(updatedIcos);
        saveToLocalStorage(tools, updatedIcos, propFirms);
      }
    } catch (error) {
      console.error('Error updating ICO:', error);
      throw error;
    }
  };

  const updatePropFirm = async (id: string, updates: Partial<PropFirm>) => {
    try {
      if (isSupabaseConnected) {
        const { data, error } = await supabase
          .from('prop_firms')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        setPropFirms(prev => prev.map(firm => firm.id === id ? data : firm));
      } else {
        // Demo mode - just update local state
        const updatedFirms = propFirms.map(firm => firm.id === id ? { ...firm, ...updates, updated_at: new Date().toISOString() } : firm);
        setPropFirms(updatedFirms);
        saveToLocalStorage(tools, icos, updatedFirms);
      }
    } catch (error) {
      console.error('Error updating prop firm:', error);
      throw error;
    }
  };

  const deleteTool = async (id: string) => {
    try {
      if (isSupabaseConnected) {
        const { error } = await supabase
          .from('crypto_tools')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setTools(prev => prev.filter(tool => tool.id !== id));
      } else {
        // Demo mode - just remove from local state
        const updatedTools = tools.filter(tool => tool.id !== id);
        setTools(updatedTools);
        saveToLocalStorage(updatedTools, icos, propFirms);
      }
    } catch (error) {
      console.error('Error deleting tool:', error);
      throw error;
    }
  };

  const deleteICO = async (id: string) => {
    try {
      if (isSupabaseConnected) {
        const { error } = await supabase
          .from('ico_projects')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setIcos(prev => prev.filter(ico => ico.id !== id));
      } else {
        // Demo mode - just remove from local state
        const updatedIcos = icos.filter(ico => ico.id !== id);
        setIcos(updatedIcos);
        saveToLocalStorage(tools, updatedIcos, propFirms);
      }
    } catch (error) {
      console.error('Error deleting ICO:', error);
      throw error;
    }
  };

  const deletePropFirm = async (id: string) => {
    try {
      if (isSupabaseConnected) {
        const { error } = await supabase
          .from('prop_firms')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setPropFirms(prev => prev.filter(firm => firm.id !== id));
      } else {
        // Demo mode - just remove from local state
        const updatedFirms = propFirms.filter(firm => firm.id !== id);
        setPropFirms(updatedFirms);
        saveToLocalStorage(tools, icos, updatedFirms);
      }
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

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}