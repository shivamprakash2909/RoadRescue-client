import React, { useState, useEffect } from 'react';
import { Vehicle, VehicleRequest, VehicleType } from '../../types/customer';
import { X, Car, AlertCircle } from 'lucide-react';

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: VehicleRequest) => Promise<void>;
  vehicle?: Vehicle | null;
}

const VEHICLE_TYPES: VehicleType[] = [
  'SEDAN',
  'SUV',
  'HATCHBACK',
  'TRUCK',
  'MOTORCYCLE',
  'VAN',
  'COUPE',
  'OTHER',
];

export const VehicleModal: React.FC<VehicleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  vehicle,
}) => {
  const [vehicleType, setVehicleType] = useState<VehicleType>('SEDAN');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [color, setColor] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (vehicle) {
      setVehicleType(vehicle.vehicleType);
      setMake(vehicle.make);
      setModel(vehicle.model);
      setYear(vehicle.year);
      setRegistrationNumber(vehicle.registrationNumber);
      setColor(vehicle.color);
    } else {
      setVehicleType('SEDAN');
      setMake('');
      setModel('');
      setYear(new Date().getFullYear());
      setRegistrationNumber('');
      setColor('');
    }
    setError(null);
  }, [vehicle, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!make.trim() || !model.trim() || !registrationNumber.trim() || !color.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (year < 1950 || year > new Date().getFullYear() + 1) {
      setError(`Year must be between 1950 and ${new Date().getFullYear() + 1}`);
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        vehicleType,
        make: make.trim(),
        model: model.trim(),
        year,
        registrationNumber: registrationNumber.trim().toUpperCase(),
        color: color.trim(),
      });
      onClose();
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError?.response?.data?.message || 'Failed to save vehicle. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Car className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {vehicle ? 'Edit Vehicle' : 'Register New Vehicle'}
            </h2>
            <p className="text-sm text-gray-500">
              {vehicle ? 'Update details for your vehicle' : 'Add a vehicle to your RoadRescue garage'}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 text-red-700 text-sm">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Vehicle Type
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value as VehicleType)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              >
                {VEHICLE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Year
              </label>
              <input
                type="number"
                min={1950}
                max={new Date().getFullYear() + 1}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Make
              </label>
              <input
                type="text"
                placeholder="e.g. Toyota, Ford"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Model
              </label>
              <input
                type="text"
                placeholder="e.g. Camry, F-150"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                License Plate / Reg #
              </label>
              <input
                type="text"
                placeholder="e.g. ABC-1234"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm font-mono uppercase focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Color
              </label>
              <input
                type="text"
                placeholder="e.g. Silver, Blue"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                required
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow-md shadow-blue-500/20 transition flex items-center space-x-2"
            >
              {isSubmitting ? (
                <span>Saving...</span>
              ) : (
                <span>{vehicle ? 'Update Vehicle' : 'Register Vehicle'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
