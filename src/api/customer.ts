import { apiClient } from './client';
import { CustomerProfile, UpdateProfileRequest } from '../types/customer';

export const getCustomerProfile = async (): Promise<CustomerProfile> => {
  const response = await apiClient.get<CustomerProfile>('/api/v1/customers/profile');
  return response.data;
};

export const updateCustomerProfile = async (
  data: UpdateProfileRequest
): Promise<CustomerProfile> => {
  const response = await apiClient.put<CustomerProfile>('/api/v1/customers/profile', data);
  return response.data;
};
