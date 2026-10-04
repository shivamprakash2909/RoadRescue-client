import { apiClient } from './client';
import { Vehicle, VehicleRequest } from '../types/customer';

export const getVehicles = async (): Promise<Vehicle[]> => {
  const response = await apiClient.get<Vehicle[]>('/api/v1/vehicles');
  return response.data;
};

export const getVehicle = async (id: string): Promise<Vehicle> => {
  const response = await apiClient.get<Vehicle>(`/api/v1/vehicles/${id}`);
  return response.data;
};

export const addVehicle = async (data: VehicleRequest): Promise<Vehicle> => {
  const response = await apiClient.post<Vehicle>('/api/v1/vehicles', data);
  return response.data;
};

export const updateVehicle = async (id: string, data: VehicleRequest): Promise<Vehicle> => {
  const response = await apiClient.put<Vehicle>(`/api/v1/vehicles/${id}`, data);
  return response.data;
};

export const deleteVehicle = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/v1/vehicles/${id}`);
};
