import React, { createContext, useContext, useState } from 'react';

export interface CryptoTool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  premium: boolean;
  rating: number;
  url: string;
  affiliateUrl?: string;
  commission?: number;
  features: string[];
}

export interface ICOProject {
  id: string;
  name: string;
  symbol: string;
  description: string;
  startDate: string;
  endDate: string;
  target: string;
  raised: string;
  participants: number;
  rating: number;
  category: string;
  logo: string;
  status: 'upcoming' | 'active' | 'completed';
  website?: string;
  whitepaper?: string;
  social?: {
    twitter?: string;
    telegram?: string;
    discord?: string;
  };
}

export interface PropFirm {
  id: string;
  name: string;
  logo: string;
  description: string;
  minCapital: string;
  maxCapital: string;
  profitSplit: string;
  monthlyTarget: string;
  challenge: boolean;
  instruments: string[];
  rating: number;
  reviews: number;
  features: string[];
  website?: string;
  affiliateUrl?: string;
  commission?: number;
}

interface DataContextType {
  tools: CryptoTool[];
  icos: ICOProject[];
  propFirms: PropFirm[];
  addTool: (tool: Omit<CryptoTool, 'id'>) => void;
  addICO: (ico: Omit<ICOProject, 'id'>) => void;
  addPropFirm: (firm: Omit<PropFirm, 'id'>) => void;
  updateTool: (id: string, tool: Partial<CryptoTool>) => void;
  updateICO: (id: string, ico: Partial<ICOProject>) => void;
  updatePropFirm: (id: string, firm: Partial<PropFirm>) => void;
  deleteTool: (id: string) => void;
  deleteICO: (id: string) => void;
  deletePropFirm: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [tools, setTools] = useState<CryptoTool[]>([
    {
      id: '1',
      name: 'Crypto Calculator',
      description: 'Calculate crypto conversions and portfolio values in real-time',
      category: 'Trading',
      icon: '🧮',
      premium: false,
      rating: 4.8,
      url: '/tools/crypto-calculator',
      affiliateUrl: 'https://example.com/crypto-calc?ref=cryptohub',
      commission: 15,
      features: ['Real-time prices', 'Portfolio tracking', 'Multi-currency support'],
    },
    {
      id: '2',
      name: 'Technical Analysis Suite',
      description: 'Advanced charting tools with 50+ indicators',
      category: 'Analysis',
      icon: '📊',
      premium: true,
      rating: 4.9,
      url: '/tools/technical-analysis',
      affiliateUrl: 'https://tradingview.com?ref=cryptohub',
      commission: 25,
      features: ['50+ indicators', 'Custom alerts', 'Multi-timeframe analysis'],
    },
    {
      id: '3',
      name: 'DCA Calculator',
      description: 'Dollar Cost Averaging calculator and strategy planner',
      category: 'Portfolio',
      icon: '💰',
      premium: false,
      rating: 4.7,
      url: '/tools/dca-calculator',
      features: ['Historical backtesting', 'Strategy optimization', 'Risk analysis'],
    },
    {
      id: '4',
      name: 'Arbitrage Scanner',
      description: 'Find arbitrage opportunities across exchanges',
      category: 'Trading',
      icon: '⚡',
      premium: true,
      rating: 4.9,
      url: '/tools/arbitrage-scanner',
      affiliateUrl: 'https://coinigy.com?ref=cryptohub',
      commission: 30,
      features: ['Real-time scanning', '20+ exchanges', 'Profit calculations'],
    },
  ]);

  const [icos, setIcos] = useState<ICOProject[]>([
    {
      id: '1',
      name: 'QuantumChain',
      symbol: 'QTC',
      description: 'Next-generation blockchain with quantum-resistant security',
      startDate: '2024-02-15',
      endDate: '2024-03-15',
      target: '$50M',
      raised: '$0',
      participants: 0,
      rating: 4.8,
      category: 'Infrastructure',
      logo: '🔗',
      status: 'upcoming',
      website: 'https://quantumchain.io',
      social: {
        twitter: 'https://twitter.com/quantumchain',
        telegram: 'https://t.me/quantumchain',
      },
    },
    {
      id: '2',
      name: 'GreenEnergy Coin',
      symbol: 'GEC',
      description: 'Sustainable blockchain for renewable energy trading',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      target: '$40M',
      raised: '$28M',
      participants: 15420,
      rating: 4.7,
      category: 'Sustainability',
      logo: '⚡',
      status: 'active',
      website: 'https://greenenergycoin.io',
    },
  ]);

  const [propFirms, setPropFirms] = useState<PropFirm[]>([
    {
      id: '1',
      name: 'FTMO',
      logo: '💼',
      description: 'Leading prop trading firm with excellent profit splits and trading conditions',
      minCapital: '$10,000',
      maxCapital: '$400,000',
      profitSplit: '80%',
      monthlyTarget: '10%',
      challenge: true,
      instruments: ['Forex', 'Indices', 'Commodities', 'Crypto'],
      rating: 4.8,
      reviews: 2340,
      features: ['No time limit', 'Weekend holding allowed', 'Expert advisors allowed'],
      website: 'https://ftmo.com',
      affiliateUrl: 'https://ftmo.com?ref=cryptohub',
      commission: 200,
    },
    {
      id: '2',
      name: 'MyForexFunds',
      logo: '🚀',
      description: 'Fast-growing prop firm with competitive terms and quick payouts',
      minCapital: '$5,000',
      maxCapital: '$300,000',
      profitSplit: '75%',
      monthlyTarget: '8%',
      challenge: true,
      instruments: ['Forex', 'Indices', 'Commodities'],
      rating: 4.6,
      reviews: 1820,
      features: ['Rapid verification', 'Multiple account sizes', 'No minimum trading days'],
      website: 'https://myforexfunds.com',
      affiliateUrl: 'https://myforexfunds.com?ref=cryptohub',
      commission: 150,
    },
  ]);

  const addTool = (tool: Omit<CryptoTool, 'id'>) => {
    const newTool = { ...tool, id: Date.now().toString() };
    setTools(prev => [...prev, newTool]);
  };

  const addICO = (ico: Omit<ICOProject, 'id'>) => {
    const newICO = { ...ico, id: Date.now().toString() };
    setIcos(prev => [...prev, newICO]);
  };

  const addPropFirm = (firm: Omit<PropFirm, 'id'>) => {
    const newFirm = { ...firm, id: Date.now().toString() };
    setPropFirms(prev => [...prev, newFirm]);
  };

  const updateTool = (id: string, updates: Partial<CryptoTool>) => {
    setTools(prev => prev.map(tool => tool.id === id ? { ...tool, ...updates } : tool));
  };

  const updateICO = (id: string, updates: Partial<ICOProject>) => {
    setIcos(prev => prev.map(ico => ico.id === id ? { ...ico, ...updates } : ico));
  };

  const updatePropFirm = (id: string, updates: Partial<PropFirm>) => {
    setPropFirms(prev => prev.map(firm => firm.id === id ? { ...firm, ...updates } : firm));
  };

  const deleteTool = (id: string) => {
    setTools(prev => prev.filter(tool => tool.id !== id));
  };

  const deleteICO = (id: string) => {
    setIcos(prev => prev.filter(ico => ico.id !== id));
  };

  const deletePropFirm = (id: string) => {
    setPropFirms(prev => prev.filter(firm => firm.id !== id));
  };

  return (
    <DataContext.Provider value={{
      tools,
      icos,
      propFirms,
      addTool,
      addICO,
      addPropFirm,
      updateTool,
      updateICO,
      updatePropFirm,
      deleteTool,
      deleteICO,
      deletePropFirm,
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