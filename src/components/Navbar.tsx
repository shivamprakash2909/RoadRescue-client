import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { apiClient } from "../api/client";
import { Wrench, Shield, User, LogOut } from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiClient.post("/api/v1/auth/logout");
    } catch {
      // Ignore network errors during logout
    } finally {
      logout();
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Wrench className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">RoadRescue</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                    {user.role}
                  </span>
                </div>

                {user.role === "CUSTOMER" && (
                  <Link to="/customer" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                    Dashboard
                  </Link>
                )}
                {(user.role === "MECHANIC" || user.role === "TOW_PROVIDER") && (
                  <Link to="/provider" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                    Provider Panel
                  </Link>
                )}
                {user.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 flex items-center space-x-1"
                  >
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span>Admin</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-sm font-medium text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-sm transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
