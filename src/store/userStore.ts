import { create } from "zustand";

interface UserState {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  onboardingComplete: boolean;
  setOnboardingComplete: (v: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  user: null,
  onboardingComplete: true,
  login: (email, name) => set({ isAuthenticated: true, user: { email, name } }),
  logout: () => set({ isAuthenticated: false, user: null }),
  setOnboardingComplete: (v) => set({ onboardingComplete: v }),
}));
