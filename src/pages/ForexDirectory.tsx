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
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredFirms.map((firm) => (
            <div key={firm.id} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <img 
                    src={firm.iconUrl} 
                    alt={firm.name}
                    className="w-16 h-16 mr-4 rounded-xl shadow-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/64x64/3B82F6/FFFFFF?text=' + firm.name.charAt(0);
                    }}
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{firm.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(firm.rating) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2 font-medium">
                        {firm.rating} ({firm.reviews} reviews)
                      </span>
                    </div>
                    {firm.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {firm.highlights.slice(0, 2).map((highlight, i) => (
                          <span key={i} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {!firm.challenge && (
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-bold">
                      No Challenge
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 leading-relaxed">{firm.description}</p>

              {/* Special Offers */}
              {firm.offers.length > 0 && (
                <div className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                  <h4 className="text-sm font-bold text-green-800 mb-2 flex items-center">
                    🎁 Special Offers
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    {firm.offers.slice(0, 2).map((offer, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {offer}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center text-gray-600 mb-1">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">Capital</span>
                  </div>
                  <div className="font-bold text-gray-900 text-sm">
                    {firm.minCapital}
                  </div>
                  <div className="text-xs text-gray-500">
                    up to {firm.maxCapital}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                  <div className="flex items-center text-gray-600 mb-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">Profit Split</span>
                  </div>
                  <div className="font-bold text-green-600 text-lg">{firm.profitSplit}</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
                  <div className="flex items-center text-gray-600 mb-1">
                    <span className="text-xs font-medium">Max Drawdown</span>
                  </div>
                  <div className="font-bold text-orange-600 text-lg">{firm.maxDrawdown}</div>
                </div>
              </div>

              {/* Instruments */}
              <div className="mb-6">
                <span className="text-sm font-semibold text-gray-700 mb-3 block">Trading Instruments:</span>
                <div className="flex flex-wrap gap-2">
                  {firm.instruments.map((instrument, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                      {instrument}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <span className="text-sm font-semibold text-gray-700 mb-3 block">Key Features:</span>
                <ul className="text-sm text-gray-700 space-y-1">
                  {firm.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Link
                  to={`/forex/${firm.id}`}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors text-center"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleApplyClick(firm)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-bold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
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