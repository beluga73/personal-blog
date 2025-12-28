import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { StrapiUser } from '@/types/auth';

interface AuthState {
  user: StrapiUser | null;
  jwt: string | null;
  setAuth: (user: StrapiUser, jwt: string) => void;
  logout: () => void;
  updateUser: (user: StrapiUser) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      jwt: null,
      setAuth: (user, jwt) => set({ user, jwt }),
      logout: () => set({ user: null, jwt: null }),
      updateUser: (user) => set({ user }),
    }),
    { name: 'auth-storage' }
  )
);
