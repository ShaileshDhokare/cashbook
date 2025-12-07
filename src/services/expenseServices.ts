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
  startDate?: string | null;
  endDate?: string | null;
  categoryIds?: number[];
  paymentModeIds?: number[];
  searchQuery?: string;
  page?: number;
  pageSize?: number;
  amountQuery?: {
    condition: 'gte' | 'lte';
    amount: number;
  };
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    from: number;
    to: number;
  };
};

export type ExpenseWithDetails = Expense & {
  categories: { name: string } | null;
  payment_modes: { name: string } | null;
};

export const EXPENSE_KEYS = {
  all: ['expenses'] as const,
  byBook: (bookId: number, userId: string, filters: ExpenseFilters) =>
    ['expenses', { bookId, userId, ...filters }] as const,
  total: (bookId: number, userId: string, filters: ExpenseFilters) =>
    ['total', { bookId, userId, ...filters }] as const,
  top: (userId: string) => ['top_expenses', userId] as const,
};

function applyFilters(query: any, filters: ExpenseFilters) {
  if (filters.startDate) query = query.gte('date', filters.startDate);
  if (filters.endDate) query = query.lte('date', filters.endDate);
  if (filters.categoryIds?.length)
    query = query.in('category_id', filters.categoryIds);
  if (filters.paymentModeIds?.length)
    query = query.in('payment_mode_id', filters.paymentModeIds);

  if (filters.searchQuery?.trim()) {
    const q = filters.searchQuery.trim();
    query.ilike('remark', `%${q}%`);
  }
  if (filters.amountQuery) {
    const { condition, amount } = filters.amountQuery;
    if (amount && amount > 0) {
      if (condition === 'gte') {
        query = query.gte('amount', amount);
      } else if (condition === 'lte') {
        query = query.lte('amount', amount);
      }
    }
  }
  return query;
}

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
export function useExpensesByBook(
  bookId: number,
  userId: string,
  filters: ExpenseFilters = {}
) {
  return useQuery({
    queryKey: EXPENSE_KEYS.byBook(bookId, userId, filters),

    placeholderData: keepPreviousData,

    queryFn: async () => {
      const { page = 1, pageSize = 25, ...restFilters } = filters;

      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('expenses')
        .select(`*, categories ( name ), payment_modes ( name )`, {
          count: 'exact',
        })
        .eq('book_id', bookId)
        .eq('user_id', userId);

      query = applyFilters(query, restFilters);

      query = query.order('date', { ascending: false }).range(from, to);

      const { data, error, count } = await query;
      if (error) throw error;

      const totalItems = count ?? 0;

      return {
        data: data as unknown as ExpenseWithDetails[],
        meta: {
          totalItems,
          totalPages: Math.ceil(totalItems / pageSize),
          currentPage: page,
          from: totalItems === 0 ? 0 : from + 1,
          to: totalItems === 0 ? 0 : Math.min(to + 1, totalItems),
        },
      } as PaginatedResponse<ExpenseWithDetails>;
    },
    enabled: !!bookId,
  });
}

// 3. ADD EXPENSE
export function useAddExpense(bookId: number,
  userId: string,) {
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
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.byBook(bookId, userId, {}) });
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.total(bookId, userId, {}) });
    },
  });
}

// 4. EDIT EXPENSE
export function useUpdateExpense(bookId: number,
  userId: string,) {
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
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.byBook(bookId, userId, {}) });
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.total(bookId, userId, {}) });
    },
  });
}

// 5. DELETE EXPENSE
export function useDeleteExpense(bookId: number,
  userId: string,) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from('expenses').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.byBook(bookId, userId, {}) });
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.total(bookId, userId, {}) });
    },
  });
}

// 6. TOTAL OF EXPENSES
export function useTotalOfExpenses(
  bookId: number,
  userId: string,
  filters: ExpenseFilters = {}
) {
  return useQuery({
    queryKey: EXPENSE_KEYS.total(bookId, userId, filters),
    queryFn: async () => {
      let query = supabase
        .from('expenses')
        .select('amount.sum()')
        .eq('book_id', bookId)
        .eq('user_id', userId);

      query = applyFilters(query, filters);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!bookId,
  });
}

// 7. GET TOP 10 expenses
export function useTopExpenses(userId: string) {
  return useQuery({
    queryKey: EXPENSE_KEYS.top(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select(`*, categories ( name ), payment_modes ( name )`, {
          count: 'exact',
        })
        .eq('user_id', userId)
        .order('amount', { ascending: false })
        .limit(10);
      if (error) throw error;
      return data as ExpenseWithDetails[];
    },
    enabled: !!userId,
  });
}
