import React from 'react';
import { Link } from 'react-router-dom';
import { Car, AlertCircle, History, Clock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Customer Assistance Portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl">
              <AlertCircle className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Breakdown Assistance</h2>
              <p className="text-sm text-gray-500">Need immediate help on the road?</p>
            </div>
          </div>
          <Link
            to="/booking/new"
            className="mt-4 block w-full text-center py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
          >
            Request Rescue Now
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Car className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">My Vehicles</h2>
              <p className="text-sm text-gray-500">Manage your registered cars & bikes</p>
            </div>
          </div>
          <button
            disabled
            className="mt-4 block w-full text-center py-2.5 bg-gray-100 text-gray-400 font-semibold rounded-lg cursor-not-allowed"
          >
            Manage Garage (Phase 3)
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <History className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Booking History</h2>
              <p className="text-sm text-gray-500">Past service requests & receipts</p>
            </div>
          </div>
          <button
            disabled
            className="mt-4 block w-full text-center py-2.5 bg-gray-100 text-gray-400 font-semibold rounded-lg cursor-not-allowed"
          >
            View History (Phase 5)
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <span>Active Request Status</span>
        </h3>
        <p className="text-gray-500 text-sm">No active breakdown requests at the moment.</p>
      </div>
    </div>
  );
};
