export type Expense = {
  id: number;
  user_id: number;
  book_id: number;
  category_id: number;
  payment_mode_id: number;
  amount: number;
  date: string;
  remark: string;
  created_at: string;
};

export type ExpenseShow = Omit<
  Expense,
  'user_id' | 'book_id' | 'category_id' | 'payment_mode_id'
> & {
  category: string;
  payment_mode: string;
};

export type Book = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at?: string;
};

export type BookWithExpenseSummary = {
  id: number;
  name: string;
  description: string;
  all_time: number;
  this_month: number;
  this_year: number;
};

export type PaymentMode = {
  id: number;
  user_id: number;
  name: string;
  is_active: boolean;
  created_at?: string;
};

export type Category = {
  id: number;
  user_id?: number;
  book_id?: number;
  name: string;
  is_active?: boolean;
  created_at?: string;
};

export type DateRange = {
  startDate: string;
  endDate: string;
};

export type DurationTypes =
  | 'this_month'
  | 'last_month'
  | 'this_year'
  | 'all_time'
  | 'custom_range';
