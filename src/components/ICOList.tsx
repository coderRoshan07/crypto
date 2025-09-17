import React, { useState } from 'react';
import { Calendar, DollarSign, Users, ExternalLink, Star } from 'lucide-react';

export default function ICOList() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const icos = {
    upcoming: [
      {
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
      },
      {
        name: 'DeFi Protocol X',
        symbol: 'DPX',
        description: 'Revolutionary DeFi protocol with cross-chain capabilities',
        startDate: '2024-02-20',
        endDate: '2024-03-20',
        target: '$25M',
        raised: '$0',
        participants: 0,
        rating: 4.6,
        category: 'DeFi',
        logo: '💰',
      },
      {
        name: 'MetaVerse Land',
        symbol: 'MVL',
        description: 'Virtual real estate platform for the metaverse',
        startDate: '2024-03-01',
        endDate: '2024-04-01',
        target: '$75M',
        raised: '$0',
        participants: 0,
        rating: 4.4,
        category: 'Gaming',
        logo: '🌐',
      },
    ],
    active: [
      {
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
      },
      {
        name: 'ArtChain NFT',
        symbol: 'ART',
        description: 'Premium NFT marketplace with artist royalties',
        startDate: '2024-01-10',
        endDate: '2024-02-10',
        target: '$30M',
        raised: '$18M',
        participants: 8930,
        rating: 4.5,
        category: 'NFT',
        logo: '🎨',
      },
    ],
    completed: [
      {
        name: 'SpaceCoin',
        symbol: 'SPC',
        description: 'Satellite communication blockchain network',
        startDate: '2023-11-01',
        endDate: '2023-12-01',
        target: '$20M',
        raised: '$20M',
        participants: 12500,
        rating: 4.9,
        category: 'Technology',
        logo: '🚀',
      },
      {
        name: 'HealthChain',
        symbol: 'HLC',
        description: 'Blockchain for secure medical data management',
        startDate: '2023-10-15',
        endDate: '2023-11-15',
        target: '$35M',
        raised: '$35M',
        participants: 18200,
        rating: 4.8,
        category: 'Healthcare',
        logo: '🏥',
      },
    ],
  };

  const tabs = [
    { id: 'upcoming', label: 'Upcoming ICOs', count: icos.upcoming.length },
    { id: 'active', label: 'Active ICOs', count: icos.active.length },
    { id: 'completed', label: 'Completed ICOs', count: icos.completed.length },
  ];

  const getStatusColor = (tab: string) => {
    switch (tab) {
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const calculateProgress = (raised: string, target: string) => {
    const raisedAmount = parseFloat(raised.replace(/[$M]/g, ''));
    const targetAmount = parseFloat(target.replace(/[$M]/g, ''));
    return Math.min((raisedAmount / targetAmount) * 100, 100);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ICO Directory</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and track the latest Initial Coin Offerings from promising blockchain projects
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-700 text-blue-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* ICO Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {icos[activeTab as keyof typeof icos].map((ico, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-3xl mr-3">{ico.logo}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{ico.name}</h3>
                    <span className="text-sm text-gray-500">{ico.symbol}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-gray-600">{ico.rating}</span>
                </div>
              </div>

              {/* Category */}
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${getStatusColor(activeTab)}`}>
                {ico.category}
              </span>

              {/* Description */}
              <p className="text-gray-600 mb-4 text-sm">{ico.description}</p>

              {/* Progress Bar (for active ICOs) */}
              {activeTab === 'active' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(calculateProgress(ico.raised, ico.target))}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${calculateProgress(ico.raised, ico.target)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Start Date
                  </div>
                  <span className="text-gray-900">{ico.startDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Target / Raised
                  </div>
                  <span className="text-gray-900">{ico.target} / {ico.raised}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    Participants
                  </div>
                  <span className="text-gray-900">{ico.participants.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                {activeTab === 'upcoming' ? 'Get Notified' : 
                 activeTab === 'active' ? 'Participate' : 'View Details'}
                <ExternalLink className="h-4 w-4 ml-2" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}