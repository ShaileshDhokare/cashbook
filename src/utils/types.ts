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
