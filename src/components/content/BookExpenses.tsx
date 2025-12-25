import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import Expense from './Expense';
import type { ExpenseWithDetails } from '@/services/expenseServices';
import Loader from './Loader';
import { ScrollArea } from '../ui/scroll-area';
import { getFormattedDate, groupExpensesByDate } from '@/utils/commonUtils';
import { format } from 'date-fns';

type BookExpensesProps = {
  expenses?: ExpenseWithDetails[];
  isLoading?: boolean;
  paginationData?: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    from: number;
    to: number;
  };
  setCurrentPage?: (page: number) => void;
};

const BookExpenses = ({
  expenses,
  isLoading,
  paginationData,
  setCurrentPage,
}: BookExpensesProps) => {
  console.log(
    '🚀 ~ :34 ~ BookExpenses ~ expenses:',
    groupExpensesByDate(expenses || [])
  );
  const {
    totalItems = 0,
    totalPages = 0,
    currentPage = 1,
    from = 0,
    to = 0,
  } = paginationData ?? {};

  if (!isLoading && (!expenses || expenses.length === 0)) {
    return (
      <div className='flex flex-col items-center justify-center h-24 w-full'>
        <p className='text-gray-500 text-lg'>No expenses found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className='flex flex-col md:flex-row gap-3 items-center justify-between mb-3'>
        <div className='text-sm font-medium w-full'>
          <span>
            Showing {from}-{to} of {totalItems} entries
          </span>
        </div>
        <div className='flex w-full justify-end items-center gap-3'>
          <div className='flex items-center justify-center gap-2 text-sm font-medium'>
            <span>Page</span>
            <Select
              defaultValue={`${currentPage}`}
              onValueChange={(value) => {
                setCurrentPage && setCurrentPage(Number(value));
              }}
            >
              <SelectTrigger className='w-fit px-2' id='rows-per-page'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent side='top'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <SelectItem key={page} value={`${page}`}>
                      {page}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <span>of {totalPages}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Button variant='outline' className='rounded-sm' size='icon'>
              <ChevronLeft />
            </Button>
            <Button variant='outline' className='rounded-sm' size='icon'>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
      <div className='rounded-sm'>
        <ScrollArea className='h-[500px] md:h-[700px] w-full px-3'>
          <div className='flex flex-col gap-3'>
            {isLoading ? (
              <Loader show={isLoading} />
            ) : (
              groupExpensesByDate(expenses || []).map(({ date, expenses }) => (
                <div className='flex flex-col gap-3'>
                  <div className='text-base font-semibold text-neutral-500 w-full flex justify-center items-center my-1'>
                    {format(date, 'dd MMMM yyyy')}
                  </div>
                  {expenses?.map((expense) => (
                    <Expense
                      key={expense.id}
                      expense={expense}
                      showActions={true}
                      displayDate='date'
                    />
                  ))}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default BookExpenses;
