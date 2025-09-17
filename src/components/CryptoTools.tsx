import React, { useState } from 'react';
import { Search, Calculator, BarChart3, DollarSign, TrendingUp, Zap, Shield, Clock } from 'lucide-react';

export default function CryptoTools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Trading', 'Portfolio', 'Analysis', 'Security', 'Mining'];

  const tools = [
    {
      name: 'Crypto Calculator',
      description: 'Calculate crypto conversions and portfolio values in real-time',
      category: 'Trading',
      icon: Calculator,
      premium: false,
      rating: 4.8,
    },
    {
      name: 'Technical Analysis Suite',
      description: 'Advanced charting tools with 50+ indicators',
      category: 'Analysis',
      icon: BarChart3,
      premium: true,
      rating: 4.9,
    },
    {
      name: 'DCA Calculator',
      description: 'Dollar Cost Averaging calculator and strategy planner',
      category: 'Portfolio',
      icon: DollarSign,
      premium: false,
      rating: 4.7,
    },
    {
      name: 'Profit/Loss Tracker',
      description: 'Track your crypto gains and losses across exchanges',
      category: 'Portfolio',
      icon: TrendingUp,
      premium: false,
      rating: 4.6,
    },
    {
      name: 'Arbitrage Scanner',
      description: 'Find arbitrage opportunities across exchanges',
      category: 'Trading',
      icon: Zap,
      premium: true,
      rating: 4.9,
    },
    {
      name: 'Wallet Security Checker',
      description: 'Analyze wallet security and get safety recommendations',
      category: 'Security',
      icon: Shield,
      premium: false,
      rating: 4.8,
    },
    {
      name: 'Mining Profitability',
      description: 'Calculate mining profitability for various cryptocurrencies',
      category: 'Mining',
      icon: Clock,
      premium: false,
      rating: 4.5,
    },
    {
      name: 'Options Strategy Builder',
      description: 'Build and analyze crypto options strategies',
      category: 'Trading',
      icon: BarChart3,
      premium: true,
      rating: 4.8,
    },
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Crypto Tools Directory</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover powerful tools to enhance your cryptocurrency trading and investment experience
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-700 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-700" />
                  </div>
                  {tool.premium && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      PRO
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-sm text-gray-600">{tool.rating}</span>
                  </div>
                  <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Use Tool
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tools found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}