import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Wrench, CheckCircle2, XCircle, Radio } from 'lucide-react';

export const ProviderDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [isAvailable, setIsAvailable] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Provider Console: {user?.name}</h1>
          <p className="text-gray-600">Service Category: {user?.role}</p>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center space-x-3 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm">
          <Radio className={`h-5 w-5 ${isAvailable ? 'text-green-500 animate-pulse' : 'text-gray-400'}`} />
          <span className="text-sm font-semibold text-gray-700">
            {isAvailable ? 'AVAILABLE FOR JOBS' : 'OFFLINE'}
          </span>
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              isAvailable
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isAvailable ? 'Go Offline' : 'Go Available'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-sm font-medium text-gray-500">Incoming Requests</span>
          <div className="text-3xl font-bold text-gray-900 mt-2">0</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-sm font-medium text-gray-500">Jobs Completed</span>
          <div className="text-3xl font-bold text-gray-900 mt-2">0</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-sm font-medium text-gray-500">Provider Rating</span>
          <div className="text-3xl font-bold text-amber-500 mt-2">5.0 ★</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Wrench className="h-5 w-5 text-gray-500" />
          <span>Active Service Dispatch Queue</span>
        </h3>
        <p className="text-gray-500 text-sm">Waiting for incoming dispatch events from matching service.</p>
      </div>
    </div>
  );
};
