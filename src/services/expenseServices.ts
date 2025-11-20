import type { Expense } from './../utils/types';
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { supabase } from '../supabaseClient';

export type CreateExpenseInput = Omit<Expense, 'id' | 'created_at'>;

export type UpdateExpenseInput = {
  id: number;
  category_id?: number;
  payment_mode_id?: number;
  amount?: number;
  date?: string;
  remark?: string;
};

export type ExpenseFilters = {
  startDate?: string | null; // Format: 'YYYY-MM-DD'
  endDate?: string | null; // Format: 'YYYY-MM-DD'
  categoryIds?: number[]; // Array of IDs from multi-select
  paymentModeIds?: number[]; // Array of IDs from multi-select
  searchQuery?: string; // Text for remark or amount
  page: number; // 1-based index (Page 1, Page 2...)
  pageSize: number; // How many items per page (10, 25, 50)
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    totalItems: number; // Total count in DB
    totalPages: number; // Total pages available
    currentPage: number; // The page we are on
    from: number; // "Showing 1..."
    to: number; // "...to 10"
  };
};

export type ExpenseWithDetails = Expense & {
  categories: { name: string } | null;
  payment_modes: { name: string } | null;
};

export const EXPENSE_KEYS = {
  all: ['expenses'] as const,
  byBook: (bookId: number, filters: ExpenseFilters) =>
    ['expenses', { bookId, ...filters }] as const,
};

// 1. LIST ALL EXPENSES
export function useExpenses() {
  return useQuery({
    queryKey: EXPENSE_KEYS.all,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Expense[];
    },
  });
}

// 2. LIST EXPENSES BY BOOK (Optional but highly recommended)
export function useExpensesByBook(bookId: number, filters: ExpenseFilters) {
  return useQuery({
    // 1. Add page and pageSize to queryKey so it refetches when they change
    queryKey: EXPENSE_KEYS.byBook(bookId, filters),

    // 2. This keeps the OLD data visible while the NEW page loads (no flashing spinners)
    placeholderData: keepPreviousData,

    queryFn: async () => {
      const { page, pageSize, ...restFilters } = filters;

      // Calculate Range for Supabase (0-based index)
      // Page 1 (size 10): from 0, to 9
      // Page 2 (size 10): from 10, to 19
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      // Start Query
      let query = supabase
        .from('expenses')
        .select(
          `
          *,
          categories ( name ),
          payment_modes ( name )
        `,
          { count: 'exact' }
        ) // IMPORTANT: Ask Supabase for the total count
        .eq('book_id', bookId);

      // --- APPLY EXISTING FILTERS (Same as before) ---
      if (restFilters.startDate)
        query = query.gte('date', restFilters.startDate);
      if (restFilters.endDate) query = query.lte('date', restFilters.endDate);
      if (restFilters.categoryIds?.length)
        query = query.in('category_id', restFilters.categoryIds);
      if (restFilters.paymentModeIds?.length)
        query = query.in('payment_mode_id', restFilters.paymentModeIds);

      if (restFilters.searchQuery?.trim()) {
        const q = restFilters.searchQuery.trim();
        const orConditions = `remark.ilike.%${q}%,amount::text.ilike.%${q}%`;
        query = query.or(orConditions);
      }

      // --- APPLY PAGINATION & SORT ---
      query = query.order('date', { ascending: false }).range(from, to); // Limit the results

      const { data, error, count } = await query;
      if (error) throw error;

      // Handle case where count is null (shouldn't happen with count: 'exact')
      const totalItems = count ?? 0;

      // Construct Response
      return {
        data: data as unknown as ExpenseWithDetails[],
        meta: {
          totalItems,
          totalPages: Math.ceil(totalItems / pageSize),
          currentPage: page,
          // Human readable 'from' (1 instead of 0)
          from: totalItems === 0 ? 0 : from + 1,
          // Human readable 'to' (Cannot exceed total items)
          to: totalItems === 0 ? 0 : Math.min(to + 1, totalItems),
        },
      } as PaginatedResponse<ExpenseWithDetails>;
    },
    enabled: !!bookId,
  });
}

// 3. ADD EXPENSE
export function useAddExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newExpense: CreateExpenseInput) => {
      const { data, error } = await supabase
        .from('expenses')
        .insert([newExpense])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.all });
    },
  });
}

// 4. EDIT EXPENSE
export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateExpenseInput) => {
      const { data, error } = await supabase
        .from('expenses')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.all });
    },
  });
}

// 5. DELETE EXPENSE
export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from('expenses').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.all });
    },
  });
}
