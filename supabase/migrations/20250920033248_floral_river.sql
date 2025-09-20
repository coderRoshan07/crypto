/*
  # Complete Database Schema Rebuild

  1. New Tables
    - `crypto_tools` - Cryptocurrency tools directory
    - `ico_projects` - ICO project listings  
    - `prop_firms` - Forex prop trading firms

  2. Security
    - Enable RLS on all tables
    - Add policies for public read and authenticated write access

  3. Sample Data
    - Pre-populate with realistic sample data
    - Include proper URLs and affiliate links
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS crypto_tools CASCADE;
DROP TABLE IF EXISTS ico_projects CASCADE;
DROP TABLE IF EXISTS prop_firms CASCADE;

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

-- Enable RLS
ALTER TABLE crypto_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE ico_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE prop_firms ENABLE ROW LEVEL SECURITY;

-- Create policies for crypto_tools
CREATE POLICY "Allow public read access on crypto_tools"
  ON crypto_tools FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated insert on crypto_tools"
  ON crypto_tools FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on crypto_tools"
  ON crypto_tools FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete on crypto_tools"
  ON crypto_tools FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for ico_projects
CREATE POLICY "Allow public read access on ico_projects"
  ON ico_projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated insert on ico_projects"
  ON ico_projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on ico_projects"
  ON ico_projects FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete on ico_projects"
  ON ico_projects FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for prop_firms
CREATE POLICY "Allow public read access on prop_firms"
  ON prop_firms FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated insert on prop_firms"
  ON prop_firms FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on prop_firms"
  ON prop_firms FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete on prop_firms"
  ON prop_firms FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample crypto tools
INSERT INTO crypto_tools (name, description, category, icon_url, premium, rating, url, affiliate_url, features) VALUES
('CoinMarketCap', 'The world''s most-referenced price-tracking website for cryptoassets', 'Analysis', 'https://coinmarketcap.com/favicon.ico', false, 4.8, 'https://coinmarketcap.com', 'https://coinmarketcap.com/?ref=affiliate', ARRAY['Real-time prices', 'Market cap rankings', 'Portfolio tracking', 'News and analysis']),
('TradingView', 'Advanced financial visualization platform with powerful charting tools', 'Trading', 'https://tradingview.com/favicon.ico', true, 4.9, 'https://tradingview.com', 'https://tradingview.com/?aff_id=12345', ARRAY['Advanced charting', '100+ indicators', 'Social trading', 'Alerts and notifications']),
('CoinGecko', 'Cryptocurrency data platform with comprehensive market analysis', 'Analysis', 'https://coingecko.com/favicon.ico', false, 4.7, 'https://coingecko.com', null, ARRAY['Price tracking', 'DeFi analytics', 'NFT floor prices', 'Yield farming data']),
('DeFiPulse', 'The decentralized finance leaderboard and analytics platform', 'DeFi', 'https://defipulse.com/favicon.ico', false, 4.6, 'https://defipulse.com', null, ARRAY['TVL tracking', 'DeFi rankings', 'Yield farming', 'Protocol analytics']),
('Messari', 'Crypto research and data platform for institutional investors', 'Analysis', 'https://messari.io/favicon.ico', true, 4.8, 'https://messari.io', 'https://messari.io/?ref=partner', ARRAY['Research reports', 'On-chain metrics', 'Governance tracking', 'Institutional data']);

-- Insert sample ICO projects
INSERT INTO ico_projects (name, symbol, description, start_date, end_date, target, raised, participants, rating, category, icon_url, status, website, whitepaper, social) VALUES
('QuantumChain', 'QTC', 'Next-generation blockchain with quantum-resistant security protocols', '2024-03-15', '2024-04-15', '$50M', '$0', 0, 4.8, 'Infrastructure', 'https://via.placeholder.com/64x64/3B82F6/FFFFFF?text=Q', 'upcoming', 'https://quantumchain.io', 'https://quantumchain.io/whitepaper.pdf', '{"twitter": "https://twitter.com/quantumchain", "telegram": "https://t.me/quantumchain"}'),
('GreenEnergy Coin', 'GEC', 'Sustainable blockchain platform for renewable energy trading and carbon credits', '2024-01-15', '2024-02-15', '$40M', '$28M', 15420, 4.7, 'Sustainability', 'https://via.placeholder.com/64x64/10B981/FFFFFF?text=G', 'active', 'https://greenenergycoin.io', null, '{"twitter": "https://twitter.com/greenenergycoin"}'),
('MetaVerse Land', 'MVL', 'Virtual real estate platform for the metaverse with NFT integration', '2024-04-01', '2024-05-01', '$75M', '$0', 0, 4.4, 'Gaming', 'https://via.placeholder.com/64x64/8B5CF6/FFFFFF?text=M', 'upcoming', 'https://metaverseland.io', 'https://metaverseland.io/whitepaper.pdf', '{"twitter": "https://twitter.com/metaverseland", "discord": "https://discord.gg/metaverseland"}'),
('SpaceCoin', 'SPC', 'Satellite communication blockchain network for global connectivity', '2023-11-01', '2023-12-01', '$20M', '$20M', 12500, 4.9, 'Technology', 'https://via.placeholder.com/64x64/F59E0B/FFFFFF?text=S', 'completed', 'https://spacecoin.network', 'https://spacecoin.network/whitepaper.pdf', '{"twitter": "https://twitter.com/spacecoin", "telegram": "https://t.me/spacecoin"}');

-- Insert sample prop firms
INSERT INTO prop_firms (name, icon_url, description, min_capital, max_capital, profit_split, max_drawdown, trading_period, challenge, instruments, rating, reviews, features, offers, highlights, website, affiliate_url) VALUES
('FTMO', 'https://ftmo.com/favicon.ico', 'Leading proprietary trading firm with excellent profit splits and professional trading conditions', '$10,000', '$400,000', '80%', '10%', '30 days', true, ARRAY['Forex', 'Indices', 'Commodities', 'Crypto'], 4.8, 2340, ARRAY['No time limit on funded account', 'Weekend holding allowed', 'Expert advisors permitted', 'Scaling plan available'], ARRAY['10% discount on challenge fee', 'Free retry on first attempt'], ARRAY['Most Popular', 'Trusted'], 'https://ftmo.com', 'https://ftmo.com/?ref=partner123'),
('MyForexFunds', 'https://myforexfunds.com/favicon.ico', 'Fast-growing prop firm with competitive terms and rapid verification process', '$5,000', '$300,000', '75%', '8%', '30 days', true, ARRAY['Forex', 'Indices', 'Commodities'], 4.6, 1820, ARRAY['Rapid verification process', 'Multiple account sizes', 'No minimum trading days', 'Flexible trading rules'], ARRAY['15% discount for new traders', 'Instant funding available'], ARRAY['Fast Payouts'], 'https://myforexfunds.com', 'https://myforexfunds.com/?aff=crypto123'),
('The5%ers', 'https://the5ers.com/favicon.ico', 'Performance-based funding program with generous profit sharing and scaling opportunities', '$20,000', '$4,000,000', '80%', '5%', 'No limit', false, ARRAY['Forex', 'Indices', 'Crypto', 'Stocks'], 4.7, 950, ARRAY['No challenge fee required', 'Aggressive scaling program', 'Crypto trading allowed', 'High-frequency trading permitted'], ARRAY['No upfront costs', 'Performance-based scaling'], ARRAY['No Challenge', 'High Scaling'], 'https://the5ers.com', null),
('Apex Trader Funding', 'https://apextraderfunding.com/favicon.ico', 'Specialized futures trading firm with excellent support and professional tools', '$25,000', '$300,000', '90%', '3%', '30 days', true, ARRAY['Futures', 'Forex', 'Commodities'], 4.9, 780, ARRAY['Highest profit split in industry', 'Futures trading focused', 'Professional trading tools', 'Dedicated support team'], ARRAY['90% profit split guarantee', 'Free platform access'], ARRAY['Highest Split', 'Futures Expert'], 'https://apextraderfunding.com', 'https://apextraderfunding.com/?ref=crypto'),
('E8 Markets', 'https://e8markets.com/favicon.ico', 'European regulated prop firm with transparent rules and fair trading conditions', '$25,000', '$2,500,000', '80%', '8%', '30 days', true, ARRAY['Forex', 'Indices', 'Commodities', 'Crypto'], 4.4, 890, ARRAY['EU regulated and licensed', 'High capital limits available', 'MetaTrader 5 platform', 'Transparent fee structure'], ARRAY['EU regulation guarantee', 'High leverage available'], ARRAY['EU Regulated'], 'https://e8markets.com', null),
('Funded Next', 'https://fundednext.com/favicon.ico', 'Innovative prop firm with flexible trading rules and competitive profit splits', '$6,000', '$200,000', '85%', '6%', '30 days', true, ARRAY['Forex', 'Indices', 'Commodities', 'Crypto'], 4.5, 1200, ARRAY['Highest profit split available', 'Copy trading allowed', 'News trading permitted', 'Flexible drawdown rules'], ARRAY['85% profit split', 'Copy trading bonus'], ARRAY['Flexible Rules'], 'https://fundednext.com', 'https://fundednext.com/?ref=partner');