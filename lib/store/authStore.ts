import { create } from "zustand";
import { tokenUtils } from "@/lib/api/client";

interface AuthState {
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  checkAuth: () => {
    const hasToken = tokenUtils.hasToken();
    return hasToken;
  },
}));
