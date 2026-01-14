import { create } from 'zustand';
import { tokenUtils } from '@/lib/api/client';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  logout: () => {
    tokenUtils.removeToken();
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  checkAuth: () => {
    const hasToken = tokenUtils.hasToken();
    if (!hasToken) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
    return hasToken;
  },
}));
