import type { PaymentMode } from '@/utils/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';

export type CreatePaymentModeInput = Omit<PaymentMode, 'id' | 'created_at'>;

export type UpdatePaymentModeInput = {
  id: number;
  name?: string;
  is_active?: boolean;
};

export const PAYMENT_MODE_KEYS = {
  all: ['payment_modes'] as const,
};

// 1. LIST ALL PAYMENT MODES
export function usePaymentModes(user_id: string) {
  return useQuery({
    queryKey: PAYMENT_MODE_KEYS.all,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_modes')
        .select('*')
        .eq('user_id', user_id)
        .order('name', { ascending: true });

      if (error) throw error;
      return data as PaymentMode[];
    },
  });
}

// 2. ADD PAYMENT MODE
export function useAddPaymentMode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newMode: CreatePaymentModeInput) => {
      const { data, error } = await supabase
        .from('payment_modes')
        .insert([newMode])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_MODE_KEYS.all });
    },
  });
}

// 3. EDIT PAYMENT MODE
export function useUpdatePaymentMode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdatePaymentModeInput) => {
      const { data, error } = await supabase
        .from('payment_modes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_MODE_KEYS.all });
    },
  });
}
