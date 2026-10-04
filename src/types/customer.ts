export type VehicleType =
  | 'SEDAN'
  | 'SUV'
  | 'HATCHBACK'
  | 'TRUCK'
  | 'MOTORCYCLE'
  | 'VAN'
  | 'COUPE'
  | 'OTHER';

export interface CustomerProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface Vehicle {
  id: string;
  customerId: string;
  vehicleType: VehicleType;
  make: string;
  model: string;
  year: number;
  registrationNumber: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleRequest {
  vehicleType: VehicleType;
  make: string;
  model: string;
  year: number;
  registrationNumber: string;
  color: string;
}
