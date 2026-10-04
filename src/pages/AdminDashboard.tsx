import React from 'react';
import { Shield, Users, Wrench, CheckCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
          <Shield className="h-8 w-8 text-purple-600" />
          <span>Platform Administration Panel</span>
        </h1>
        <p className="text-gray-600">RoadRescue Governance and Operations Oversight</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3 text-blue-600 mb-2">
            <Users className="h-5 w-5" />
            <span className="text-sm font-semibold text-gray-500">Customers</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">0</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3 text-green-600 mb-2">
            <Wrench className="h-5 w-5" />
            <span className="text-sm font-semibold text-gray-500">Mechanics</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">0</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3 text-amber-600 mb-2">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-semibold text-gray-500">Towing Fleets</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">0</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3 text-purple-600 mb-2">
            <Shield className="h-5 w-5" />
            <span className="text-sm font-semibold text-gray-500">Total Bookings</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">0</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Pending Provider Verifications</h3>
        <p className="text-gray-500 text-sm">No provider verifications currently awaiting approval.</p>
      </div>
    </div>
  );
};
