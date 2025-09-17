import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, DollarSign, TrendingUp, Users, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import AddToolModal from '../components/AddToolModal';
import AddICOModal from '../components/AddICOModal';
import AddPropFirmModal from '../components/AddPropFirmModal';

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const { tools, icos, propFirms } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddToolModal, setShowAddToolModal] = useState(false);
  const [showAddICOModal, setShowAddICOModal] = useState(false);
  const [showAddPropFirmModal, setShowAddPropFirmModal] = useState(false);

  if (!user || !isAdmin) {
    navigate('/login');
    return null;
  }

  const stats = [
    {
      name: 'Total Tools',
      value: tools.length,
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      name: 'Active ICOs',
      value: icos.filter(ico => ico.status === 'active').length,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      name: 'Prop Firms',
      value: propFirms.length,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      name: 'Total Revenue',
      value: '$12,450',
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tools', label: 'Crypto Tools' },
    { id: 'icos', label: 'ICO Projects' },
    { id: 'propfirms', label: 'Prop Firms' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your crypto platform content and track performance</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-gray-600">New ICO project added</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-600">Tool affiliate link updated</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        <span className="text-gray-600">New prop firm partnership</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Technical Analysis Suite</span>
                        <span className="font-medium text-green-600">$2,450</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">FTMO</span>
                        <span className="font-medium text-green-600">$1,800</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Arbitrage Scanner</span>
                        <span className="font-medium text-green-600">$1,200</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tools' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Crypto Tools</h3>
                  <button
                    onClick={() => setShowAddToolModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tool
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tool
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Commission
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tools.map((tool) => (
                        <tr key={tool.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-2xl mr-3">{tool.icon}</div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{tool.name}</div>
                                <div className="text-sm text-gray-500">{tool.description.substring(0, 50)}...</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {tool.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {tool.commission ? `$${tool.commission}` : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {tool.rating}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-indigo-600 hover:text-indigo-900">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'icos' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">ICO Projects</h3>
                  <button
                    onClick={() => setShowAddICOModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add ICO
                  </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {icos.map((ico) => (
                    <div key={ico.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="text-2xl mr-3">{ico.logo}</div>
                        <div>
                          <h4 className="font-medium text-gray-900">{ico.name}</h4>
                          <p className="text-sm text-gray-500">{ico.symbol}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{ico.description.substring(0, 100)}...</p>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          ico.status === 'active' ? 'bg-green-100 text-green-800' :
                          ico.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {ico.status}
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'propfirms' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Prop Firms</h3>
                  <button
                    onClick={() => setShowAddPropFirmModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Prop Firm
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {propFirms.map((firm) => (
                    <div key={firm.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{firm.logo}</div>
                          <div>
                            <h4 className="font-medium text-gray-900">{firm.name}</h4>
                            <p className="text-sm text-gray-500">Rating: {firm.rating}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">{firm.profitSplit}</p>
                          <p className="text-xs text-gray-500">Profit Split</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{firm.description.substring(0, 100)}...</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Commission: {firm.commission ? `$${firm.commission}` : 'N/A'}
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddToolModal && (
        <AddToolModal onClose={() => setShowAddToolModal(false)} />
      )}
      {showAddICOModal && (
        <AddICOModal onClose={() => setShowAddICOModal(false)} />
      )}
      {showAddPropFirmModal && (
        <AddPropFirmModal onClose={() => setShowAddPropFirmModal(false)} />
      )}
    </div>
  );
}