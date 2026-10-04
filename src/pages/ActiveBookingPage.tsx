import React from 'react';
import { MapPin, CheckCircle, Navigation } from 'lucide-react';

export const ActiveBookingPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Active Rescue Tracking</h1>
        <p className="text-sm text-gray-500 mb-6">Live status updates via WebSocket connection</p>

        {/* Status Stepper */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold text-sm">Request Created</span>
          </div>
          <div className="flex items-center space-x-3 text-blue-600">
            <Navigation className="h-5 w-5 animate-spin" />
            <span className="font-semibold text-sm">Searching for Nearby Provider</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-400">
            <MapPin className="h-5 w-5" />
            <span className="font-semibold text-sm">Provider En Route</span>
          </div>
        </div>
      </div>
    </div>
  );
};
