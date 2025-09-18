/*
  # Complete Crypto Platform Database Schema

  1. New Tables
    - `crypto_tools` - Store cryptocurrency tools and calculators
    - `ico_projects` - Store ICO project information  
    - `prop_firms` - Store forex prop trading firms

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin operations

  3. Sample Data
    - Pre-populate tables with sample data for immediate use
*/

-- Create crypto_tools table
CREATE TABLE IF NOT EXISTS crypto_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  icon_url text DEFAULT '',
  premium boolean DEFAULT false,
  rating numeric(2,1) DEFAULT 4.0,
  url text NOT NULL,
  affiliate_url text,
  features text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ico_projects table
CREATE TABLE IF NOT EXISTS ico_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  symbol text NOT NULL,
  description text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  target text NOT NULL,
  raised text DEFAULT '$0',
  participants integer DEFAULT 0,
  rating numeric(2,1) DEFAULT 4.0,
  category text NOT NULL,
  icon_url text DEFAULT '',
  status text NOT NULL CHECK (status IN ('upcoming', 'active', 'completed')),
  website text,
  whitepaper text,
  social jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create prop_firms table
CREATE TABLE IF NOT EXISTS prop_firms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon_url text DEFAULT '',
  description text NOT NULL,
  min_capital text NOT NULL,
  max_capital text NOT NULL,
  profit_split text NOT NULL,
  max_drawdown text NOT NULL,
  trading_period text NOT NULL,
  challenge boolean DEFAULT true,
  instruments text[] DEFAULT '{}',
  rating numeric(2,1) DEFAULT 4.0,
  reviews integer DEFAULT 0,
  features text[] DEFAULT '{}',
  offers text[] DEFAULT '{}',
  highlights text[] DEFAULT '{}',
  website text,
  affiliate_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE crypto_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE ico_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE prop_firms ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on crypto_tools"
  ON crypto_tools
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on ico_projects"
  ON ico_projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on prop_firms"
  ON prop_firms
  FOR SELECT
  TO public
  USING (true);

-- Create policies for authenticated admin operations
CREATE POLICY "Allow authenticated insert on crypto_tools"
  ON crypto_tools
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on crypto_tools"
  ON crypto_tools
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete on crypto_tools"
  ON crypto_tools
  FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on ico_projects"
  ON ico_projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on ico_projects"
  ON ico_projects
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete on ico_projects"
  ON ico_projects
  FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on prop_firms"
  ON prop_firms
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on prop_firms"
  ON prop_firms
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete on prop_firms"
  ON prop_firms
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample crypto tools
INSERT INTO crypto_tools (name, description, category, icon_url, premium, rating, url, affiliate_url, features) VALUES
('CoinMarketCap', 'Real-time cryptocurrency prices and market data', 'Trading', 'https://coinmarketcap.com/favicon.ico', false, 4.8, 'https://coinmarketcap.com', 'https://coinmarketcap.com?ref=cryptohub', ARRAY['Real-time prices', 'Market cap data', 'Portfolio tracking']),
('TradingView', 'Advanced charting and technical analysis platform', 'Analysis', 'https://tradingview.com/favicon.ico', true, 4.9, 'https://tradingview.com', 'https://tradingview.com?ref=cryptohub', ARRAY['Advanced charts', '100+ indicators', 'Social trading']),
('CoinGecko', 'Cryptocurrency data and portfolio tracker', 'Portfolio', 'https://coingecko.com/favicon.ico', false, 4.7, 'https://coingecko.com', 'https://coingecko.com?ref=cryptohub', ARRAY['Portfolio tracking', 'DeFi data', 'NFT tracking']),
('DeFiPulse', 'DeFi analytics and yield farming data', 'Analysis', 'https://defipulse.com/favicon.ico', false, 4.6, 'https://defipulse.com', NULL, ARRAY['TVL tracking', 'Yield farming', 'DeFi protocols']),
('Messari', 'Crypto research and market intelligence', 'Analysis', 'https://messari.io/favicon.ico', true, 4.8, 'https://messari.io', 'https://messari.io?ref=cryptohub', ARRAY['Research reports', 'On-chain data', 'Market intelligence']);

-- Insert sample ICO projects
INSERT INTO ico_projects (name, symbol, description, start_date, end_date, target, raised, participants, rating, category, icon_url, status, website, social) VALUES
('QuantumChain', 'QTC', 'Next-generation blockchain with quantum-resistant security protocols', '2024-03-15', '2024-04-15', '$50M', '$0', 0, 4.8, 'Infrastructure', 'https://via.placeholder.com/64x64/3B82F6/FFFFFF?text=QTC', 'upcoming', 'https://quantumchain.io', '{"twitter": "https://twitter.com/quantumchain", "telegram": "https://t.me/quantumchain"}'),
('GreenEnergy Coin', 'GEC', 'Sustainable blockchain for renewable energy trading and carbon credits', '2024-02-01', '2024-03-01', '$40M', '$28M', 15420, 4.7, 'Sustainability', 'https://via.placeholder.com/64x64/22C55E/FFFFFF?text=GEC', 'active', 'https://greenenergycoin.io', '{"twitter": "https://twitter.com/greenenergycoin"}'),
('MetaVerse Land', 'MVL', 'Virtual real estate platform for the metaverse with NFT integration', '2024-04-01', '2024-05-01', '$75M', '$0', 0, 4.4, 'Gaming', 'https://via.placeholder.com/64x64/8B5CF6/FFFFFF?text=MVL', 'upcoming', 'https://metaverseland.io', '{"twitter": "https://twitter.com/metaverseland", "discord": "https://discord.gg/metaverseland"}'),
('SpaceCoin', 'SPC', 'Satellite communication blockchain network for global connectivity', '2023-11-01', '2023-12-01', '$20M', '$20M', 12500, 4.9, 'Technology', 'https://via.placeholder.com/64x64/F59E0B/FFFFFF?text=SPC', 'completed', 'https://spacecoin.io', '{"twitter": "https://twitter.com/spacecoin"}');

-- Insert sample prop firms
INSERT INTO prop_firms (name, icon_url, description, min_capital, max_capital, profit_split, max_drawdown, trading_period, challenge, instruments, rating, reviews, features, offers, highlights, website, affiliate_url) VALUES
('FTMO', 'https://ftmo.com/favicon.ico', 'Leading proprietary trading firm with excellent profit splits and professional trading conditions', '$10,000', '$400,000', '80%', '10%', '30 days', true, ARRAY['Forex', 'Indices', 'Commodities', 'Crypto'], 4.8, 2340, ARRAY['No time limit', 'Weekend holding allowed', 'Expert advisors allowed', 'Free VPS'], ARRAY['Free retries on challenge', '14-day money back guarantee', 'Up to 90% profit split after scaling'], ARRAY['Most trusted prop firm', 'Over 200,000 traders funded'], 'https://ftmo.com', 'https://ftmo.com?ref=cryptohub'),
('MyForexFunds', 'https://myforexfunds.com/favicon.ico', 'Fast-growing prop firm with competitive terms and rapid verification process', '$5,000', '$300,000', '75%', '12%', '30 days', true, ARRAY['Forex', 'Indices', 'Commodities'], 4.6, 1820, ARRAY['Rapid verification', 'Multiple account sizes', 'No minimum trading days', 'Mobile trading'], ARRAY['50% discount on challenges', 'Instant funding available', 'No time limits'], ARRAY['Fastest growing prop firm', 'Same-day payouts'], 'https://myforexfunds.com', 'https://myforexfunds.com?ref=cryptohub'),
('The5%ers', 'https://the5ers.com/favicon.ico', 'Performance-based funding program with generous profit sharing and no challenge fees', '$20,000', '$4,000,000', '80%', '6%', 'No limit', false, ARRAY['Forex', 'Indices', 'Crypto', 'Stocks'], 4.7, 950, ARRAY['No challenge fee', 'Aggressive scaling', 'Crypto trading allowed', 'High-frequency trading'], ARRAY['No evaluation fee', 'Immediate funding', 'Scale up to $4M'], ARRAY['No challenge required', 'Highest capital limits'], 'https://the5ers.com', 'https://the5ers.com?ref=cryptohub'),
('Apex Trader Funding', 'https://apextrader.com/favicon.ico', 'Specialized futures trading firm with excellent support and professional tools', '$25,000', '$300,000', '90%', '3%', '30 days', true, ARRAY['Futures', 'Forex', 'Commodities'], 4.9, 780, ARRAY['90% profit split', 'Futures focused', 'Professional tools', 'Dedicated support'], ARRAY['Free Sierra Chart', 'No platform fees', 'Lifetime resets'], ARRAY['Highest profit split', 'Futures specialists'], 'https://apextrader.com', 'https://apextrader.com?ref=cryptohub'),
('E8 Markets', 'https://e8markets.com/favicon.ico', 'European regulated prop firm with transparent rules and fair trading conditions', '$25,000', '$2,500,000', '80%', '8%', '30 days', true, ARRAY['Forex', 'Indices', 'Commodities', 'Crypto'], 4.4, 890, ARRAY['EU regulated', 'High capital limits', 'MetaTrader 5', 'Copy trading allowed'], ARRAY['Weekend holding allowed', 'News trading permitted', 'EA trading allowed'], ARRAY['EU regulated', 'Transparent rules'], 'https://e8markets.com', 'https://e8markets.com?ref=cryptohub'),
('Funded Next', 'https://fundednext.com/favicon.ico', 'Innovative prop firm with flexible trading rules and high capital limits', '$6,000', '$200,000', '85%', '5%', '30 days', true, ARRAY['Forex', 'Indices', 'Commodities', 'Crypto'], 4.5, 1200, ARRAY['Highest profit split', 'Copy trading allowed', 'News trading allowed', 'Weekend holding'], ARRAY['85% profit split', 'Free VPS included', 'Bi-weekly payouts'], ARRAY['Highest profit split', 'Most flexible rules'], 'https://fundednext.com', 'https://fundednext.com?ref=cryptohub');