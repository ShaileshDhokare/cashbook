import type { LoginFormData } from '@/pages/Login';
import type { RegisterFormData } from '@/pages/Register';
import { supabase } from '@/supabaseClient';
import { useMutation } from '@tanstack/react-query';

export function useUserRegister() {
  return useMutation({
    mutationKey: ['userRegister'],
    mutationFn: async (formData: RegisterFormData) => {
      const { email, password, firstName, lastName, username } = formData;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            username,
          },
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;
      return data;
    },
  });
}

export function useUserLogin() {
  return useMutation({
    mutationKey: ['userLogin'],
    mutationFn: async (formData: LoginFormData) => {
      const { email, password } = formData;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    },
  });
}
