import React from 'react';
import { Vehicle } from '../../types/customer';
import { Car, Truck, Bike, Edit2, Trash2, Calendar, Shield } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onEdit, onDelete }) => {
  const getIcon = () => {
    switch (vehicle.vehicleType) {
      case 'TRUCK':
      case 'VAN':
        return <Truck className="h-6 w-6 text-indigo-600" />;
      case 'MOTORCYCLE':
        return <Bike className="h-6 w-6 text-amber-600" />;
      default:
        return <Car className="h-6 w-6 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
              {getIcon()}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight">
                {vehicle.make} {vehicle.model}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-500 mt-0.5">
                <span className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {vehicle.year}
                </span>
                <span>•</span>
                <span className="font-medium text-gray-600">{vehicle.color}</span>
              </div>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 uppercase tracking-wide">
            {vehicle.vehicleType}
          </span>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200/70 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-gray-400" />
            <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Plate</span>
          </div>
          <span className="font-mono font-bold text-sm text-gray-900 tracking-wider bg-white px-2.5 py-0.5 rounded border border-gray-200">
            {vehicle.registrationNumber}
          </span>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-end space-x-2">
        <button
          onClick={() => onEdit(vehicle)}
          className="inline-flex items-center space-x-1 text-xs font-medium text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
        >
          <Edit2 className="h-3.5 w-3.5" />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(vehicle.id)}
          className="inline-flex items-center space-x-1 text-xs font-medium text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};
