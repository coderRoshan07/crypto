import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, Calendar, DollarSign, Users, Globe, FileText } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function ICODetail() {
  const { id } = useParams();
  const { icos } = useData();
  const ico = icos.find(i => i.id === id);

  if (!ico) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">ICO Not Found</h1>
            <Link to="/ico" className="text-blue-600 hover:text-blue-800">
              ← Back to ICO List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const calculateProgress = (raised: string, target: string) => {
    const raisedAmount = parseFloat(raised.replace(/[$M]/g, ''));
    const targetAmount = parseFloat(target.replace(/[$M]/g, ''));
    return Math.min((raisedAmount / targetAmount) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/ico"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to ICO List
        </Link>

        {/* ICO Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="text-6xl mr-6">{ico.logo}</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{ico.name}</h1>
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-lg text-gray-600">{ico.symbol}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ico.status)}`}>
                    {ico.status.charAt(0).toUpperCase() + ico.status.slice(1)}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600">{ico.rating}</span>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {ico.category}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              {ico.website && (
                <a
                  href={ico.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </a>
              )}
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center">
                {ico.status === 'upcoming' ? 'Get Notified' : 
                 ico.status === 'active' ? 'Participate' : 'View Details'}
                <ExternalLink className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="text-lg text-gray-600 mb-6">{ico.description}</p>

          {/* Progress Bar (for active ICOs) */}
          {ico.status === 'active' && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Funding Progress</span>
                <span>{Math.round(calculateProgress(ico.raised, ico.target))}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all"
                  style={{ width: `${calculateProgress(ico.raised, ico.target)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Key Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Information</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3" />
                  <span>Start Date</span>
                </div>
                <span className="font-medium text-gray-900">{ico.startDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3" />
                  <span>End Date</span>
                </div>
                <span className="font-medium text-gray-900">{ico.endDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-5 w-5 mr-3" />
                  <span>Target Amount</span>
                </div>
                <span className="font-medium text-gray-900">{ico.target}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-5 w-5 mr-3" />
                  <span>Amount Raised</span>
                </div>
                <span className="font-medium text-green-600">{ico.raised}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3" />
                  <span>Participants</span>
                </div>
                <span className="font-medium text-gray-900">{ico.participants.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Resources</h2>
            <div className="space-y-4">
              {ico.website && (
                <a
                  href={ico.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-900">Official Website</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
              )}
              {ico.whitepaper && (
                <a
                  href={ico.whitepaper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-900">Whitepaper</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
              )}
              {ico.social?.twitter && (
                <a
                  href={ico.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-3">🐦</span>
                    <span className="font-medium text-gray-900">Twitter</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
              )}
              {ico.social?.telegram && (
                <a
                  href={ico.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-3">✈️</span>
                    <span className="font-medium text-gray-900">Telegram</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              {ico.description} This innovative project aims to revolutionize the {ico.category.toLowerCase()} space 
              by providing cutting-edge solutions that address current market challenges. The team behind {ico.name} 
              consists of experienced professionals with a proven track record in blockchain technology and business development.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              The {ico.symbol} token will serve as the native utility token of the platform, enabling users to access 
              premium features, participate in governance decisions, and earn rewards through various mechanisms. 
              The tokenomics are designed to ensure long-term sustainability and value appreciation for holders.
            </p>
          </div>
        </div>

        {/* Related ICOs */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related ICOs</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {icos
              .filter(i => i.id !== ico.id && i.category === ico.category)
              .slice(0, 4)
              .map(relatedICO => (
                <Link
                  key={relatedICO.id}
                  to={`/ico/${relatedICO.id}`}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mr-4">{relatedICO.logo}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">{relatedICO.name}</h3>
                    <p className="text-sm text-gray-600">{relatedICO.symbol} • {relatedICO.category}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${getStatusColor(relatedICO.status)}`}>
                      {relatedICO.status}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}