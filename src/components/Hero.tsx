import React from 'react';
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

export default function Hero({ setActiveSection }: HeroProps) {
  const features = [
    {
      icon: TrendingUp,
      title: 'Crypto Tools',
      description: 'Advanced cryptocurrency tools and calculators for traders and investors.',
      action: () => setActiveSection('tools'),
    },
    {
      icon: Shield,
      title: 'ICO Directory',
      description: 'Comprehensive list of upcoming and active Initial Coin Offerings.',
      action: () => setActiveSection('ico'),
    },
    {
      icon: Users,
      title: 'Forex Props',
      description: 'Directory of the best forex proprietary trading firms and opportunities.',
      action: () => setActiveSection('forex'),
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Gateway to
              <span className="text-yellow-400"> Crypto Success</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover powerful crypto tools, explore upcoming ICOs, and find the best forex prop trading opportunities all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveSection('tools')}
                className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center"
              >
                Explore Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveSection('ico')}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                View ICOs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Crypto Trading
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access comprehensive resources for cryptocurrency trading, investment research, and professional trading opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-shadow cursor-pointer group"
                  onClick={feature.action}
                >
                  <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                    <Icon className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center text-blue-700 font-medium group-hover:text-blue-800">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-gray-300">Crypto Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">200+</div>
              <div className="text-gray-300">ICO Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">30+</div>
              <div className="text-gray-300">Prop Firms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">10K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}