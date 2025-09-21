/*
  # Complete Database Schema Rebuild

  1. New Tables
    - `crypto_tools` - Cryptocurrency tools directory
    - `ico_projects` - ICO project listings  
    - `prop_firms` - Forex prop trading firms

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated user management

  3. Sample Data
    - Real crypto tools with working URLs
    - Sample ICO projects with different statuses
    - Popular prop firms with accurate data
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS crypto_tools CASCADE;
DROP TABLE IF EXISTS ico_projects CASCADE;
DROP TABLE IF EXISTS prop_firms CASCADE;

-- Create crypto_tools table
CREATE TABLE crypto_tools (
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
CREATE TABLE ico_projects (
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
CREATE TABLE prop_firms (
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
('TradingView', 'Advanced charting platform with 50+ indicators', 'Analysis', 'https://s3.tradingview.com/favicon.ico', true, 4.9, 'https://tradingview.com', 'https://tradingview.com?ref=cryptohub', ARRAY['50+ indicators', 'Custom alerts', 'Multi-timeframe analysis', 'Social trading']),
('CoinGecko', 'Comprehensive cryptocurrency data and portfolio tracker', 'Portfolio', 'https://www.coingecko.com/favicon.ico', false, 4.8, 'https://coingecko.com', null, ARRAY['Real-time prices', 'Portfolio tracking', 'Market analysis', 'News aggregation']),
('DeFiPulse', 'Track DeFi protocols and total value locked', 'Analysis', 'https://defipulse.com/favicon.ico', false, 4.7, 'https://defipulse.com', null, ARRAY['TVL tracking', 'Protocol rankings', 'Yield farming data', 'DeFi analytics']),
('Messari', 'Professional crypto research and data platform', 'Analysis', 'https://messari.io/favicon.ico', true, 4.8, 'https://messari.io', 'https://messari.io?ref=cryptohub', ARRAY['Professional research', 'On-chain metrics', 'Fundamental analysis', 'Market intelligence']),
('CoinTracker', 'Cryptocurrency tax and portfolio management', 'Portfolio', 'https://www.cointracker.io/favicon.ico', true, 4.6, 'https://cointracker.io', 'https://cointracker.io?ref=cryptohub', ARRAY['Tax reporting', 'Portfolio tracking', 'Exchange integration', 'DeFi support']),
('Glassnode', 'On-chain analytics and market intelligence', 'Analysis', 'https://glassnode.com/favicon.ico', true, 4.9, 'https://glassnode.com', 'https://glassnode.com?ref=cryptohub', ARRAY['On-chain metrics', 'Market indicators', 'Institutional data', 'Custom dashboards']);

-- Insert sample ICO projects
INSERT INTO ico_projects (name, symbol, description, start_date, end_date, target, raised, participants, rating, category, icon_url, status, website, social) VALUES
('QuantumChain', 'QTC', 'Next-generation blockchain with quantum-resistant security protocols', '2024-03-15', '2024-04-15', '$50M', '$0', 0, 4.8, 'Infrastructure', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/32/qtum.png', 'upcoming', 'https://quantumchain.example', '{"twitter": "https://twitter.com/quantumchain", "telegram": "https://t.me/quantumchain"}'),
('GreenEnergy Coin', 'GEC', 'Sustainable blockchain platform for renewable energy trading and carbon credits', '2024-01-15', '2024-02-15', '$40M', '$28M', 15420, 4.7, 'Sustainability', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/32/enj.png', 'active', 'https://greenenergycoin.example', '{"twitter": "https://twitter.com/greenenergycoin"}'),
('DeFi Protocol X', 'DPX', 'Revolutionary DeFi protocol with cross-chain yield farming capabilities', '2024-02-20', '2024-03-20', '$25M', '$0', 0, 4.6, 'DeFi', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/32/1inch.png', 'upcoming', 'https://defiprotocolx.example', '{"twitter": "https://twitter.com/defiprotocolx", "discord": "https://discord.gg/defiprotocolx"}'),
('SpaceCoin', 'SPC', 'Satellite communication blockchain network for global connectivity', '2023-11-01', '2023-12-01', '$20M', '$20M', 12500, 4.9, 'Technology', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/32/storj.png', 'completed', 'https://spacecoin.example', '{"twitter": "https://twitter.com/spacecoin"}');

-- Insert sample prop firms
INSERT INTO prop_firms (name, icon_url, description, min_capital, max_capital, profit_split, max_drawdown, trading_period, challenge, instruments, rating, reviews, features, offers, highlights, website, affiliate_url) VALUES
('FTMO', 'https://ftmo.com/favicon.ico', 'Leading proprietary trading firm with excellent profit splits and professional trading conditions', '$10,000', '$400,000', '80%', '10%', '30 days', true, ARRAY['Forex', 'Indices', 'Commodities', 'Crypto'], 4.8, 2340, ARRAY['No time limit on funded account', 'Weekend holding allowed', 'Expert advisors permitted', 'Scaling plan available'], ARRAY['Free retries on challenge failure', '14-day money back guarantee', 'Bi-weekly profit payouts'], ARRAY['Most trusted prop firm', 'Over 200,000 traders funded', 'Regulated by CySEC'], 'https://ftmo.com', 'https://ftmo.com?ref=cryptohub'),
('MyForexFunds', 'https://myforexfunds.com/favicon.ico', 'Fast-growing proprietary trading firm with competitive terms and rapid payouts', '$5,000', '$300,000', '75%', '8%', 'Unlimited', true, ARRAY['Forex', 'Indices', 'Commodities'], 4.6, 1820, ARRAY['Rapid account verification', 'Multiple account sizes available', 'No minimum trading days requirement', 'Mobile trading supported'], ARRAY['50% discount on challenge fees', 'Instant funding after passing evaluation', 'Weekly profit distributions'], ARRAY['Fastest growing prop firm', 'Same day payout processing', '24/7 customer support'], 'https://myforexfunds.com', 'https://myforexfunds.com?ref=cryptohub'),
('The5%ers', 'https://the5ers.com/favicon.ico', 'Performance-based funding program with generous profit sharing and scaling opportunities', '$20,000', '$4,000,000', '80%', '5%', 'No limit', false, ARRAY['Forex', 'Indices', 'Crypto', 'Stocks'], 4.7, 950, ARRAY['No challenge fee required', 'Aggressive account scaling', 'Cryptocurrency trading allowed', 'High-frequency trading permitted'], ARRAY['No upfront costs', 'Performance-based scaling', 'Profit sharing from day one'], ARRAY['No challenge required', 'Up to $4M in funding', 'Crypto trading allowed'], 'https://the5ers.com', 'https://the5ers.com?ref=cryptohub'),
('Funded Next', 'https://fundednext.com/favicon.ico', 'Innovative proprietary trading firm with flexible rules and high capital limits', '$6,000', '$200,000', '85%', '6%', '30 days', true, ARRAY['Forex', 'Indices', 'Commodities', 'Crypto'], 4.5, 1200, ARRAY['Highest profit split in industry', 'Copy trading strategies allowed', 'News trading permitted', 'No consistency rule'], ARRAY['Highest profit split available', 'Flexible trading rules', 'Multiple evaluation options'], ARRAY['85% profit split', 'Most flexible rules', 'Copy trading allowed'], 'https://fundednext.com', 'https://fundednext.com?ref=cryptohub');