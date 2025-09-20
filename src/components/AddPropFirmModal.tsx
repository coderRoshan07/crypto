import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface AddPropFirmModalProps {
  onClose: () => void;
}

export default function AddPropFirmModal({ onClose }: AddPropFirmModalProps) {
  const { addPropFirm } = useData();
  const [formData, setFormData] = useState({
    name: '',
    icon_url: '',
    description: '',
    min_capital: '',
    max_capital: '',
    profit_split: '',
    max_drawdown: '',
    trading_period: '',
    challenge: true,
    instruments: ['Forex'],
    rating: 4.0,
    reviews: 0,
    features: [''],
    offers: [''],
    highlights: [''],
    website: '',
    affiliate_url: '',
  });

  const availableInstruments = ['Forex', 'Indices', 'Commodities', 'Crypto', 'Stocks', 'Futures'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const firmData = {
        name: formData.name,
        icon_url: formData.icon_url || '',
        description: formData.description,
        min_capital: formData.min_capital,
        max_capital: formData.max_capital,
        profit_split: formData.profit_split,
        max_drawdown: formData.max_drawdown,
        trading_period: formData.trading_period,
        challenge: formData.challenge,
        instruments: formData.instruments,
        rating: formData.rating,
        reviews: formData.reviews,
        features: formData.features.filter(f => f.trim() !== ''),
        offers: formData.offers.filter(f => f.trim() !== ''),
        highlights: formData.highlights.filter(f => f.trim() !== ''),
        website: formData.website || undefined,
        affiliate_url: formData.affiliate_url || undefined,
      };
      
      await addPropFirm(firmData);
      onClose();
    } catch (error) {
      console.error('Error adding prop firm:', error);
      alert('Error adding prop firm. Please try again.');
    }
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addOffer = () => {
    setFormData(prev => ({
      ...prev,
      offers: [...prev.offers, '']
    }));
  };

  const updateOffer = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      offers: prev.offers.map((f, i) => i === index ? value : f)
    }));
  };

  const removeOffer = (index: number) => {
    setFormData(prev => ({
      ...prev,
      offers: prev.offers.filter((_, i) => i !== index)
    }));
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const updateHighlight = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.map((f, i) => i === index ? value : f)
    }));
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const toggleInstrument = (instrument: string) => {
    setFormData(prev => ({
      ...prev,
      instruments: prev.instruments.includes(instrument)
        ? prev.instruments.filter(i => i !== instrument)
        : [...prev.instruments, instrument]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add New Prop Firm</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Firm Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/favicon.ico"
                value={formData.icon_url}
                onChange={(e) => setFormData(prev => ({ ...prev, icon_url: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              placeholder="Brief description of the prop firm"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Capital
              </label>
              <input
                type="text"
                required
                placeholder="$10,000"
                value={formData.min_capital}
                onChange={(e) => setFormData(prev => ({ ...prev, min_capital: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Capital
              </label>
              <input
                type="text"
                required
                placeholder="$400,000"
                value={formData.max_capital}
                onChange={(e) => setFormData(prev => ({ ...prev, max_capital: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profit Split
              </label>
              <input
                type="text"
                required
                placeholder="80%"
                value={formData.profit_split}
                onChange={(e) => setFormData(prev => ({ ...prev, profit_split: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Drawdown
              </label>
              <input
                type="text"
                required
                placeholder="10%"
                value={formData.max_drawdown}
                onChange={(e) => setFormData(prev => ({ ...prev, max_drawdown: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trading Period
              </label>
              <input
                type="text"
                required
                placeholder="30 days"
                value={formData.trading_period}
                onChange={(e) => setFormData(prev => ({ ...prev, trading_period: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reviews Count
              </label>
              <input
                type="number"
                min="0"
                value={formData.reviews}
                onChange={(e) => setFormData(prev => ({ ...prev, reviews: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.challenge}
                onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Requires Challenge</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trading Instruments
            </label>
            <div className="grid grid-cols-3 gap-2">
              {availableInstruments.map(instrument => (
                <label key={instrument} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.instruments.includes(instrument)}
                    onChange={() => toggleInstrument(instrument)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{instrument}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website (Optional)
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Affiliate URL (Optional)
              </label>
              <input
                type="url"
                value={formData.affiliate_url}
                onChange={(e) => setFormData(prev => ({ ...prev, affiliate_url: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Features
            </label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter feature"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Add Feature
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Offers
            </label>
            {formData.offers.map((offer, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={offer}
                  onChange={(e) => updateOffer(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter special offer"
                />
                <button
                  type="button"
                  onClick={() => removeOffer(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOffer}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Add Offer
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Highlights
            </label>
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => updateHighlight(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter highlight"
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Add Highlight
            </button>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Add Prop Firm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}