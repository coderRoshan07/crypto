/*
  # Create crypto platform schema

  1. New Tables
    - `crypto_tools`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `category` (text)
      - `icon_url` (text)
      - `premium` (boolean)
      - `rating` (numeric)
      - `url` (text)
      - `affiliate_url` (text, optional)
      - `features` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `ico_projects`
      - `id` (uuid, primary key)
      - `name` (text)
      - `symbol` (text)
      - `description` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `target` (text)
      - `raised` (text)
      - `participants` (integer)
      - `rating` (numeric)
      - `category` (text)
      - `icon_url` (text)
      - `status` (text)
      - `website` (text, optional)
      - `whitepaper` (text, optional)
      - `social` (jsonb, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `prop_firms`
      - `id` (uuid, primary key)
      - `name` (text)
      - `icon_url` (text)
      - `description` (text)
      - `min_capital` (text)
      - `max_capital` (text)
      - `profit_split` (text)
      - `max_drawdown` (text)
      - `trading_period` (text)
      - `challenge` (boolean)
      - `instruments` (text array)
      - `rating` (numeric)
      - `reviews` (integer)
      - `features` (text array)
      - `offers` (text array)
      - `highlights` (text array)
      - `website` (text, optional)
      - `affiliate_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin write access
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

-- Create policies for authenticated write access (admin only)
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

-- Insert sample data
INSERT INTO crypto_tools (name, description, category, icon_url, premium, rating, url, affiliate_url, features) VALUES
('Crypto Calculator', 'Calculate crypto conversions and portfolio values in real-time', 'Trading', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/32/btc.png', false, 4.8, '/tools/crypto-calculator', 'https://example.com/crypto-calc?ref=cryptohub', ARRAY['Real-time prices', 'Portfolio tracking', 'Multi-currency support']),
('Technical Analysis Suite', 'Advanced charting tools with 50+ indicators', 'Analysis', 'https://s3.tradingview.com/favicon.ico', true, 4.9, '/tools/technical-analysis', 'https://tradingview.com?ref=cryptohub', ARRAY['50+ indicators', 'Custom alerts', 'Multi-timeframe analysis']),
('DCA Calculator', 'Dollar Cost Averaging calculator and strategy planner', 'Portfolio', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/32/eth.png', false, 4.7, '/tools/dca-calculator', null, ARRAY['Historical backtesting', 'Strategy optimization', 'Risk analysis']),
('Arbitrage Scanner', 'Find arbitrage opportunities across exchanges', 'Trading', 'https://coinigy.com/favicon.ico', true, 4.9, '/tools/arbitrage-scanner', 'https://coinigy.com?ref=cryptohub', ARRAY['Real-time scanning', '20+ exchanges', 'Profit calculations']);

INSERT INTO ico_projects (name, symbol, description, start_date, end_date, target, raised, participants, rating, category, icon_url, status, website, social) VALUES
('QuantumChain', 'QTC', 'Next-generation blockchain with quantum-resistant security', '2024-02-15', '2024-03-15', '$50M', '$0', 0, 4.8, 'Infrastructure', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/32/qtum.png', 'upcoming', 'https://quantumchain.io', '{"twitter": "https://twitter.com/quantumchain", "telegram": "https://t.me/quantumchain"}'),
('GreenEnergy Coin', 'GEC', 'Sustainable blockchain for renewable energy trading', '2024-01-15', '2024-02-15', '$40M', '$28M', 15420, 4.7, 'Sustainability', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/32/enj.png', 'active', 'https://greenenergycoin.io', '{}');

INSERT INTO prop_firms (name, icon_url, description, min_capital, max_capital, profit_split, max_drawdown, trading_period, challenge, instruments, rating, reviews, features, offers, highlights, website, affiliate_url) VALUES
('FTMO', 'https://ftmo.com/favicon.ico', 'Leading prop trading firm with excellent profit splits and trading conditions', '$10,000', '$400,000', '80%', '10%', '30 days', true, ARRAY['Forex', 'Indices', 'Commodities', 'Crypto'], 4.8, 2340, ARRAY['No time limit', 'Weekend holding allowed', 'Expert advisors allowed'], ARRAY['Free retries on challenge', '14-day money back guarantee', 'Bi-weekly payouts'], ARRAY['Most trusted prop firm', 'Over 200,000 traders funded', 'Regulated by CySEC'], 'https://ftmo.com', 'https://ftmo.com?ref=cryptohub'),
('MyForexFunds', 'https://myforexfunds.com/favicon.ico', 'Fast-growing prop firm with competitive terms and quick payouts', '$5,000', '$300,000', '75%', '8%', 'Unlimited', true, ARRAY['Forex', 'Indices', 'Commodities'], 4.6, 1820, ARRAY['Rapid verification', 'Multiple account sizes', 'No minimum trading days'], ARRAY['50% discount on challenges', 'Instant funding after passing', 'Weekly payouts'], ARRAY['Fastest growing prop firm', 'Same day payouts', '24/7 support'], 'https://myforexfunds.com', 'https://myforexfunds.com?ref=cryptohub');