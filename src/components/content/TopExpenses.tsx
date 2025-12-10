import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import Expense from './Expense';
import { useAuthStore } from '@/store/authStore';
import { useTopExpenses } from '@/services/expenseServices';
import Loader from './Loader';
import { ScrollArea } from '../ui/scroll-area';

const TopExpenses = () => {
  const userId = useAuthStore((state: any) => {
    return state.userId;
  });

  const { data: topExpenses, isLoading: topExpensesLoading } =
    useTopExpenses(userId);

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle className='text-xl'>Top Expenses in November 2025</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[500px] w-full px-3'>
          <div className='flex flex-col gap-3'>
            {topExpensesLoading ? (
              <Loader show={true} />
            ) : (
              topExpenses?.map((expense) => (
                <Expense
                  key={expense.id}
                  expense={expense}
                  showActions={false}
                  displayDate='date'
                />
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TopExpenses;
