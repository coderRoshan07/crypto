import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, DollarSign } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function ToolDetail() {
  const { id } = useParams();
  const { tools } = useData();
  const tool = tools.find(t => t.id === id);

  if (!tool) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
            <Link to="/tools" className="text-blue-600 hover:text-blue-800">
              ← Back to Tools
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleUseToolClick = () => {
    if (tool.affiliateUrl) {
      window.open(tool.affiliateUrl, '_blank');
    } else {
      window.open(tool.url, '_blank');
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/tools"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Link>

        {/* Tool Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-4 rounded-xl mr-6">
                <img 
                  src={tool.iconUrl} 
                  alt={tool.name}
                  className="w-16 h-16"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/64x64/3B82F6/FFFFFF?text=' + tool.name.charAt(0);
                  }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{tool.name}</h1>
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {tool.category}
                  </span>
                  {tool.premium && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      PRO
                    </span>
                  )}
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600">{tool.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleUseToolClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
            >
              Use Tool
              <ExternalLink className="ml-2 h-4 w-4" />
            </button>
          </div>

          <p className="text-lg text-gray-600 mb-6">{tool.description}</p>

        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tool.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use This Tool</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Click "Use Tool"</h3>
                <p className="text-gray-600">Click the button above to access the tool directly.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Create Account</h3>
                <p className="text-gray-600">Sign up for an account if required to access premium features.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Start Using</h3>
                <p className="text-gray-600">Begin using the tool's features to enhance your crypto trading experience.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tools
              .filter(t => t.id !== tool.id && t.category === tool.category)
              .slice(0, 4)
              .map(relatedTool => (
                <Link
                  key={relatedTool.id}
                  to={`/tools/${relatedTool.id}`}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="text-2xl mr-3">{relatedTool.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">{relatedTool.name}</h3>
                    <p className="text-sm text-gray-600">{relatedTool.description.substring(0, 60)}...</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}