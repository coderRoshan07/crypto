import React, { useState } from 'react';
import { Search, DollarSign, Award, Users, TrendingUp, Filter } from 'lucide-react';

export default function ForexDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'High Capital', 'Low Capital', 'No Experience Required', 'Crypto Friendly'];

  const propFirms = [
    {
      name: 'FTMO',
      logo: '💼',
      description: 'Leading prop trading firm with excellent profit splits and trading conditions',
      minCapital: '$10,000',
      maxCapital: '$400,000',
      profitSplit: '80%',
      monthlyTarget: '10%',
      challenge: 'Yes',
      instruments: ['Forex', 'Indices', 'Commodities', 'Crypto'],
      rating: 4.8,
      reviews: 2340,
      features: ['No time limit', 'Weekend holding allowed', 'Expert advisors allowed'],
    },
    {
      name: 'MyForexFunds',
      logo: '🚀',
      description: 'Fast-growing prop firm with competitive terms and quick payouts',
      minCapital: '$5,000',
      maxCapital: '$300,000',
      profitSplit: '75%',
      monthlyTarget: '8%',
      challenge: 'Yes',
      instruments: ['Forex', 'Indices', 'Commodities'],
      rating: 4.6,
      reviews: 1820,
      features: ['Rapid verification', 'Multiple account sizes', 'No minimum trading days'],
    },
    {
      name: 'The5%ers',
      logo: '⚡',
      description: 'Performance-based funding program with generous profit sharing',
      minCapital: '$20,000',
      maxCapital: '$4,000,000',
      profitSplit: '80%',
      monthlyTarget: '5%',
      challenge: 'No',
      instruments: ['Forex', 'Indices', 'Crypto', 'Stocks'],
      rating: 4.7,
      reviews: 950,
      features: ['No challenge fee', 'Aggressive scaling', 'Crypto trading allowed'],
    },
    {
      name: 'Funded Next',
      logo: '💰',
      description: 'Innovative prop firm with flexible trading rules and high capital limits',
      minCapital: '$6,000',
      maxCapital: '$200,000',
      profitSplit: '85%',
      monthlyTarget: '6%',
      challenge: 'Yes',
      instruments: ['Forex', 'Indices', 'Commodities', 'Crypto'],
      rating: 4.5,
      reviews: 1200,
      features: ['Highest profit split', 'Copy trading allowed', 'News trading allowed'],
    },
    {
      name: 'Apex Trader Funding',
      logo: '🎯',
      description: 'Specialized in futures trading with excellent support and tools',
      minCapital: '$25,000',
      maxCapital: '$300,000',
      profitSplit: '90%',
      monthlyTarget: '3%',
      challenge: 'Yes',
      instruments: ['Futures', 'Forex', 'Commodities'],
      rating: 4.9,
      reviews: 780,
      features: ['90% profit split', 'Futures focused', 'Professional tools'],
    },
    {
      name: 'E8 Markets',
      logo: '🔥',
      description: 'European prop firm with transparent rules and fair trading conditions',
      minCapital: '$25,000',
      maxCapital: '$2,500,000',
      profitSplit: '80%',
      monthlyTarget: '8%',
      challenge: 'Yes',
      instruments: ['Forex', 'Indices', 'Commodities', 'Crypto'],
      rating: 4.4,
      reviews: 890,
      features: ['EU regulated', 'High capital limits', 'MetaTrader 5'],
    },
  ];

  const filteredFirms = propFirms.filter(firm => {
    const matchesSearch = firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         firm.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (selectedFilter === 'High Capital') {
      matchesFilter = parseInt(firm.maxCapital.replace(/[$,]/g, '')) >= 200000;
    } else if (selectedFilter === 'Low Capital') {
      matchesFilter = parseInt(firm.minCapital.replace(/[$,]/g, '')) <= 10000;
    } else if (selectedFilter === 'No Experience Required') {
      matchesFilter = firm.challenge === 'No';
    } else if (selectedFilter === 'Crypto Friendly') {
      matchesFilter = firm.instruments.includes('Crypto');
    }
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Forex Prop Firms Directory</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the best proprietary trading firms and get funded to trade forex, indices, and commodities
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search prop firms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {filters.map((filter) => (
                <option key={filter} value={filter}>{filter}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Prop Firms Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredFirms.map((firm, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-3xl mr-3">{firm.logo}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{firm.name}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(firm.rating) ? '' : 'opacity-30'}>★</span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {firm.rating} ({firm.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                {firm.challenge === 'No' && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                    No Challenge
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4">{firm.description}</p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="text-sm">Capital Range</span>
                  </div>
                  <div className="font-semibold text-gray-900">
                    {firm.minCapital} - {firm.maxCapital}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">Profit Split</span>
                  </div>
                  <div className="font-semibold text-green-600">{firm.profitSplit}</div>
                </div>
              </div>

              {/* Instruments */}
              <div className="mb-4">
                <span className="text-sm text-gray-600 mb-2 block">Trading Instruments:</span>
                <div className="flex flex-wrap gap-2">
                  {firm.instruments.map((instrument, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {instrument}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <span className="text-sm text-gray-600 mb-2 block">Key Features:</span>
                <ul className="text-sm text-gray-600">
                  {firm.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Apply Now
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredFirms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No prop firms found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}