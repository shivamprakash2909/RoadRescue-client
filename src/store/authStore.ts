import { create } from 'zustand';
import { User } from '../types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string, refreshToken?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const savedToken = localStorage.getItem('roadrescue_access_token');
  const savedRefreshToken = localStorage.getItem('roadrescue_refresh_token');
  const savedUserJson = localStorage.getItem('roadrescue_user');
  
  let savedUser: User | null = null;
  try {
    savedUser = savedUserJson ? JSON.parse(savedUserJson) : null;
  } catch {
    savedUser = null;
  }

  return {
    user: savedUser,
    token: savedToken,
    refreshToken: savedRefreshToken,
    isAuthenticated: !!savedToken && !!savedUser,
    setAuth: (user: User, accessToken: string, refreshToken?: string) => {
      localStorage.setItem('roadrescue_access_token', accessToken);
      localStorage.setItem('roadrescue_user', JSON.stringify(user));
      if (refreshToken) {
        localStorage.setItem('roadrescue_refresh_token', refreshToken);
      }
      set({ 
        user, 
        token: accessToken, 
        refreshToken: refreshToken || localStorage.getItem('roadrescue_refresh_token'),
        isAuthenticated: true 
      });
    },
    logout: () => {
      localStorage.removeItem('roadrescue_access_token');
      localStorage.removeItem('roadrescue_refresh_token');
      localStorage.removeItem('roadrescue_user');
      set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
    },
  };
});
