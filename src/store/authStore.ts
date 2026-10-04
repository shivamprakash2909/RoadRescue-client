import { create } from 'zustand';
import { User } from '../types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const savedToken = localStorage.getItem('roadrescue_access_token');
  const savedUserJson = localStorage.getItem('roadrescue_user');
  const savedUser = savedUserJson ? JSON.parse(savedUserJson) : null;

  return {
    user: savedUser,
    token: savedToken,
    isAuthenticated: !!savedToken && !!savedUser,
    setAuth: (user: User, token: string) => {
      localStorage.setItem('roadrescue_access_token', token);
      localStorage.setItem('roadrescue_user', JSON.stringify(user));
      set({ user, token, isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem('roadrescue_access_token');
      localStorage.removeItem('roadrescue_user');
      set({ user: null, token: null, isAuthenticated: false });
    },
  };
});
