import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, AlertCircle, History, Clock, User, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { getVehicles } from '../api/vehicle';
import { Vehicle } from '../types/customer';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch {
        // Soft fail on dashboard
      } finally {
        setIsLoadingVehicles(false);
      }
    };
    loadSummary();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Customer Assistance & Vehicle Management Hub
          </p>
        </div>
        <Link
          to="/customer/profile"
          className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm transition"
        >
          <User className="h-4 w-4 text-gray-500" />
          <span>Edit Profile</span>
        </Link>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Breakdown Card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-3">
              <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                <AlertCircle className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Breakdown Assistance</h2>
                <p className="text-xs text-gray-500">Need instant towing or repairs?</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Dispatch certified mechanics or towing providers directly to your current location.
            </p>
          </div>
          <Link
            to="/booking/new"
            className="mt-6 block w-full text-center py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md shadow-red-600/20 transition"
          >
            Request Rescue Now
          </Link>
        </div>

        {/* Vehicles Card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <Car className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">My Vehicles</h2>
                <p className="text-xs text-gray-500">
                  {isLoadingVehicles
                    ? 'Loading garage...'
                    : `${vehicles.length} vehicle${vehicles.length === 1 ? '' : 's'} registered`}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Register and manage your personal vehicles to ensure fast emergency dispatch.
            </p>
          </div>
          <Link
            to="/customer/vehicles"
            className="mt-6 flex items-center justify-center space-x-2 w-full text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 transition"
          >
            <span>Manage Vehicles</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Booking History Card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between opacity-85">
          <div>
            <div className="flex items-center space-x-4 mb-3">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                <History className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Booking History</h2>
                <p className="text-xs text-gray-500">Past service requests & invoices</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Review completed emergency repairs, service logs, and payment receipts.
            </p>
          </div>
          <button
            disabled
            className="mt-6 block w-full text-center py-3 bg-gray-100 text-gray-400 font-semibold rounded-xl cursor-not-allowed"
          >
            Available in Phase 5
          </button>
        </div>
      </div>

      {/* Active Request Status */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-2 flex items-center space-x-2.5">
          <Clock className="h-5 w-5 text-gray-500" />
          <span>Active Request Status</span>
        </h3>
        <p className="text-gray-500 text-sm">
          You currently have no active breakdown or towing requests in progress.
        </p>
      </div>
    </div>
  );
};
