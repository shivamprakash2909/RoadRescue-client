import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Shield, Clock, MapPin } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 mb-6">
          Phase 1 Complete — Multi-Service Skeleton Active
        </span>

        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl mb-6">
          Fast, Reliable Roadside Assistance <br />
          <span className="text-blue-600">Whenever You Need It</span>
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
          Connect with vetted nearby mechanics and towing operators in real-time. Transparent pricing, live GPS tracking, and seamless payments.
        </p>

        <div className="flex justify-center space-x-4 mb-16">
          <Link
            to="/register"
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition text-lg"
          >
            Get Road Rescue
          </Link>
          <Link
            to="/login"
            className="px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl border border-gray-300 shadow-sm transition text-lg"
          >
            Sign In
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-left">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="bg-blue-50 text-blue-600 p-3 rounded-xl w-fit mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Location Matching</h3>
            <p className="text-sm text-gray-600">Instant dispatch of the closest qualified mechanic using geospatial algorithms.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="bg-green-50 text-green-600 p-3 rounded-xl w-fit mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Live Tracking</h3>
            <p className="text-sm text-gray-600">WebSocket-powered live status updates and real-time provider ETA tracking.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="bg-purple-50 text-purple-600 p-3 rounded-xl w-fit mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Verified Providers</h3>
            <p className="text-sm text-gray-600">Strict administrative vetting for both certified mechanics and towing fleets.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="bg-amber-50 text-amber-600 p-3 rounded-xl w-fit mb-4">
              <Wrench className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Itemized Billing</h3>
            <p className="text-sm text-gray-600">Clear labor and parts breakdowns with instant payment processing.</p>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        RoadRescue &copy; 2026. Microservices Platform built with Spring Boot, Kafka, Redis, and React.
      </footer>
    </div>
  );
};
