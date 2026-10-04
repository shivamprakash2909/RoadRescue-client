import React, { useEffect, useState } from 'react';
import { Vehicle, VehicleRequest } from '../../types/customer';
import { getVehicles, addVehicle, updateVehicle, deleteVehicle } from '../../api/vehicle';
import { VehicleCard } from '../../components/customer/VehicleCard';
import { VehicleModal } from '../../components/customer/VehicleModal';
import { Plus, Car, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const VehiclesPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const fetchVehicles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getVehicles();
      setVehicles(data);
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError?.response?.data?.message || 'Failed to load vehicles');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleOpenAddModal = () => {
    setSelectedVehicle(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleSubmitVehicle = async (data: VehicleRequest) => {
    if (selectedVehicle) {
      await updateVehicle(selectedVehicle.id, data);
    } else {
      await addVehicle(data);
    }
    await fetchVehicles();
  };

  const handleDeleteVehicle = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this vehicle?')) {
      return;
    }
    try {
      await deleteVehicle(id);
      await fetchVehicles();
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      alert(axiosError?.response?.data?.message || 'Could not delete vehicle. It may be part of an active booking.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <Link
            to="/customer"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-2 transition"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Vehicles</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage cars, SUVs, and motorcycles registered to your RoadRescue account.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition"
        >
          <Plus className="h-5 w-5" />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-3 text-red-700 text-sm">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2 mb-2"></div>
              <div className="h-10 bg-gray-50 rounded-xl mt-6"></div>
            </div>
          ))}
        </div>
      ) : vehicles.length === 0 ? (
        /* Empty state */
        <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Car className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No vehicles registered</h3>
          <p className="text-gray-500 text-sm mb-6">
            Register your vehicle so our mechanics and tow trucks can assist you quickly in an emergency.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Add Your First Vehicle</span>
          </button>
        </div>
      ) : (
        /* Vehicles Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteVehicle}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <VehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitVehicle}
        vehicle={selectedVehicle}
      />
    </div>
  );
};
