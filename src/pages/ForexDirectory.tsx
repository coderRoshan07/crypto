import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, DollarSign, TrendingUp, Filter, ExternalLink, Star } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function ForexDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { propFirms } = useData();

  const filters = ['All', 'High Capital', 'Low Capital', 'No Challenge', 'Crypto Friendly'];

  const filteredFirms = propFirms.filter(firm => {
    const matchesSearch = firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         firm.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (selectedFilter === 'High Capital') {
      matchesFilter = parseInt(firm.maxCapital.replace(/[$,]/g, '')) >= 200000;
    } else if (selectedFilter === 'Low Capital') {
      matchesFilter = parseInt(firm.minCapital.replace(/[$,]/g, '')) <= 10000;
    } else if (selectedFilter === 'No Challenge') {
      matchesFilter = !firm.challenge;
    } else if (selectedFilter === 'Crypto Friendly') {
      matchesFilter = firm.instruments.includes('Crypto');
    }
    
    return matchesSearch && matchesFilter;
  });

  const handleApplyClick = (firm: any) => {
    // Track affiliate click
    if (firm.affiliateUrl) {
      window.open(firm.affiliateUrl, '_blank');
    } else if (firm.website) {
      window.open(firm.website, '_blank');
    }
  };

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
          {filteredFirms.map((firm) => (
            <div key={firm.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-3xl mr-3">{firm.logo}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{firm.name}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(firm.rating) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {firm.rating} ({firm.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  {!firm.challenge && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      No Challenge
                    </span>
                  )}
                  {firm.commission && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                      ${firm.commission} Commission
                    </span>
                  )}
                </div>
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
                  {firm.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Link
                  to={`/forex/${firm.id}`}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors text-center"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleApplyClick(firm)}
                  className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center"
                >
                  Apply Now
                  <ExternalLink className="ml-1 h-4 w-4" />
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