import type { Book, BookWithExpenseSummary } from './../utils/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';

export type CreateBookInput = Omit<Book, 'id' | 'created_at'>;

export type UpdateBookInput = {
  id: number;
  name?: string;
  description?: string;
  is_active?: boolean;
};

export const BOOK_KEYS = {
  all: ['books'] as const,
  allWithTotalExpenses: ['books', 'totalExpenses'] as const,
  detail: (id: number) => ['books', id] as const,
};

// 1. LIST ALL BOOKS
export function useBooks(userId: string) {
  return useQuery({
    queryKey: BOOK_KEYS.all,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Book[];
    },
  });
}

// 2. ADD BOOK
export function useAddBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBook: CreateBookInput) => {
      const { data, error } = await supabase
        .from('books')
        .insert([newBook])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOK_KEYS.all });
    },
  });
}

// 3. EDIT BOOK
export function useUpdateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateBookInput) => {
      const { data, error } = await supabase
        .from('books')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOK_KEYS.all });
    },
  });
}

// 4. GET BOOKS with total expenses of all time, current month and current year
export function useBooksWithTotalExpenses(userId: string) {
  return useQuery({
    queryKey: BOOK_KEYS.allWithTotalExpenses,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_books_summary', {
        userid: userId,
      });

      if (error) throw error;
      return data as BookWithExpenseSummary[];
    },
  });
}
