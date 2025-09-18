import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, DollarSign, TrendingUp, Globe, Users } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function PropFirmDetail() {
  const { id } = useParams();
  const { propFirms } = useData();
  const firm = propFirms.find(f => f.id === id);

  if (!firm) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Prop Firm Not Found</h1>
            <Link to="/forex" className="text-blue-600 hover:text-blue-800">
              ← Back to Forex Directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleApplyClick = () => {
    if (firm.affiliateUrl) {
      window.open(firm.affiliateUrl, '_blank');
    } else if (firm.website) {
      window.open(firm.website, '_blank');
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/forex"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Forex Directory
        </Link>

        {/* Firm Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <img 
                src={firm.iconUrl} 
                alt={firm.name}
                className="w-24 h-24 mr-6 rounded-xl shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/96x96/3B82F6/FFFFFF?text=' + firm.name.charAt(0);
                }}
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{firm.name}</h1>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <div className="flex text-yellow-500 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(firm.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-gray-600">
                      {firm.rating} ({firm.reviews} reviews)
                    </span>
                  </div>
                  {!firm.challenge && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      No Challenge Required
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              {firm.website && (
                <a
                  href={firm.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </a>
              )}
              <button
                onClick={handleApplyClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center"
              >
                Apply Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="text-lg text-gray-600 mb-6">{firm.description}</p>

        </div>

        {/* Key Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Capital Range</p>
                <p className="text-lg font-bold text-gray-900">{firm.minCapital}</p>
                <p className="text-sm text-gray-500">to {firm.maxCapital}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Profit Split</p>
                <p className="text-2xl font-bold text-green-600">{firm.profitSplit}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Max Drawdown</p>
                <p className="text-2xl font-bold text-orange-600">{firm.maxDrawdown}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Reviews</p>
                <p className="text-2xl font-bold text-purple-600">{firm.reviews}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Trading Instruments */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trading Instruments</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {firm.instruments.map((instrument, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">
                  {instrument === 'Forex' ? '💱' :
                   instrument === 'Indices' ? '📊' :
                   instrument === 'Commodities' ? '🥇' :
                   instrument === 'Crypto' ? '₿' :
                   instrument === 'Stocks' ? '📈' :
                   instrument === 'Futures' ? '📋' : '💼'}
                </div>
                <p className="font-medium text-gray-900">{instrument}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {firm.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How to Apply */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Apply</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Click "Apply Now"</h3>
                <p className="text-gray-600">Click the button above to visit the firm's application page.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Complete Application</h3>
                <p className="text-gray-600">Fill out the application form with your trading experience and goals.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{firm.challenge ? 'Pass Challenge' : 'Get Funded'}</h3>
                <p className="text-gray-600">
                  {firm.challenge 
                    ? 'Complete the trading challenge to prove your skills and get funded.'
                    : 'Start trading with the firm\'s capital immediately after approval.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Firms */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Prop Firms</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {propFirms
              .filter(f => f.id !== firm.id)
              .slice(0, 4)
              .map(relatedFirm => (
                <Link
                  key={relatedFirm.id}
                  to={`/forex/${relatedFirm.id}`}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <img 
                    src={relatedFirm.iconUrl} 
                    alt={relatedFirm.name}
                    className="w-12 h-12 mr-4 rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/48x48/3B82F6/FFFFFF?text=' + relatedFirm.name.charAt(0);
                    }}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{relatedFirm.name}</h3>
                    <p className="text-sm text-gray-600">Profit Split: {relatedFirm.profitSplit}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="text-xs text-gray-500">{relatedFirm.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}