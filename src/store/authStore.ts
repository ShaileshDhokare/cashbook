import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  session: null,
  user: null,
  error: null,
  userId: null,
  setSession: (session: any) =>
    set({
      session,
      user: session?.user?.user_metadata,
      userId: session?.user?.id,
    }),
  setError: (error: any) => set({ error: error }),
}));
