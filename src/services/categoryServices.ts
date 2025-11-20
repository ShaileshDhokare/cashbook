import type { Category } from './../utils/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';

export type CreateCategoryInput = Omit<Category, 'id' | 'created_at'>;

export type UpdateCategoryInput = {
  id: number;
  name?: string;
  is_active?: boolean;
};

export const CATEGORY_KEYS = {
  all: ['categories'] as const,
};

// 1. LIST ALL CATEGORIES
export function useCategories() {
  return useQuery({
    queryKey: CATEGORY_KEYS.all,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      return data as Category[];
    },
  });
}

// 2. ADD CATEGORY
export function useAddCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCategory: CreateCategoryInput) => {
      const { data, error } = await supabase
        .from('categories')
        .insert([newCategory])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all });
    },
  });
}

// 3. EDIT CATEGORY
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, name, is_active }: UpdateCategoryInput) => {
      const updates: any = {};
      if (name !== undefined) updates.name = name;
      if (is_active !== undefined) updates.is_active = is_active;

      const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all });
    },
  });
}
