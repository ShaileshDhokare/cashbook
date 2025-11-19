import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  session: null,
  user: null,
  error: null,
  setSession: (session: any) =>
    set({
      session,
      user: session?.user?.user_metadata,
    }),
  setError: (error: any) => set({ error: error }),
}));
