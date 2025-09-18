import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, CryptoTool, ICOProject, PropFirm } from '../lib/supabase';

interface DataContextType {
  tools: CryptoTool[];
  icos: ICOProject[];
  propFirms: PropFirm[];
  loading: boolean;
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

  const fetchData = async () => {
    try {
      setLoading(true);
      
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTool = async (tool: Omit<CryptoTool, 'id' | 'created_at' | 'updated_at'>) => {
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