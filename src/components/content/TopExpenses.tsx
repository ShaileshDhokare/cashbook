import type { ExpenseShow } from '@/utils/types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import Expense from './Expense';

const sampleExpenses: ExpenseShow[] = [
  {
    id: 1,
    category: 'Groceries',
    payment_mode: 'Credit Card',
    amount: 1500,
    date: '2025-11-02',
    remark: 'Weekly groceries',
    created_at: '2025-11-02T10:15:00Z',
  },
  {
    id: 2,
    category: 'Utilities',
    payment_mode: 'Debit Card',
    amount: 3200,
    date: '2025-11-05',
    remark: 'Electricity bill',
    created_at: '2025-11-05T09:00:00Z',
  },
  {
    id: 3,
    category: 'Rent',
    payment_mode: 'Bank Transfer',
    amount: 25000,
    date: '2025-11-01',
    remark: 'November rent',
    created_at: '2025-10-31T18:45:00Z',
  },
  {
    id: 4,
    category: 'Entertainment',
    payment_mode: 'Credit Card',
    amount: 800,
    date: '2025-11-12',
    remark: 'Movie and snacks',
    created_at: '2025-11-12T21:00:00Z',
  },
  {
    id: 5,
    category: 'Transport',
    payment_mode: 'Cash',
    amount: 300,
    date: '2025-11-03',
    remark: 'Taxi ride',
    created_at: '2025-11-03T07:30:00Z',
  },
  {
    id: 6,
    category: 'Health',
    payment_mode: 'Debit Card',
    amount: 1200,
    date: '2025-11-08',
    remark: 'Doctor visit',
    created_at: '2025-11-08T14:20:00Z',
  },
  {
    id: 7,
    category: 'Subscriptions',
    payment_mode: 'Credit Card',
    amount: 499,
    date: '2025-11-10',
    remark: 'Music subscription',
    created_at: '2025-11-10T06:50:00Z',
  },
  {
    id: 8,
    category: 'Dining',
    payment_mode: 'UPI',
    amount: 2200,
    date: '2025-11-15',
    remark: 'Dinner at restaurant',
    created_at: '2025-11-15T20:10:00Z',
  },
  {
    id: 9,
    category: 'Education',
    payment_mode: 'Bank Transfer',
    amount: 4500,
    date: '2025-11-06',
    remark: 'Online course',
    created_at: '2025-11-06T11:05:00Z',
  },
  {
    id: 10,
    category: 'Miscellaneous',
    payment_mode: 'Cash',
    amount: 150,
    date: '2025-11-11',
    remark: 'Stationery',
    created_at: '2025-11-11T16:00:00Z',
  },
];

const TopExpenses = () => {
  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle className='text-xl'>Top Expenses in November 2025</CardTitle>
      </CardHeader>
      <CardContent className='px-4'>
        <div className='flex flex-col gap-3'>
          {sampleExpenses.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              showActions={false}
              displayDate='created_at'
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopExpenses;
