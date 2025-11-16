export type ExpenseEntry = {
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
  ExpenseEntry,
  'user_id' | 'book_id' | 'category_id' | 'payment_mode_id'
> & {
  category: string;
  payment_mode: string;
};

export type BookEntry = {
  id: number;
  user_id?: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at?: string;
};

export type PaymentMode = {
  id: number;
  user_id?: number;
  name: string;
  is_active?: boolean;
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
