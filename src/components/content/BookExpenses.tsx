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

const BookExpenses = ({
  expenses,
  isLoading,
}: {
  expenses?: ExpenseWithDetails[];
  isLoading?: boolean;
}) => {
  return (
    <div>
      <div className='flex flex-col md:flex-row gap-3 items-center justify-between mb-3'>
        <div className='text-sm font-medium w-full'>
          <span>Showing 1-25 of 100 entries</span>
        </div>
        <div className='flex w-full justify-end items-center gap-3'>
          <div className='flex items-center justify-center gap-2 text-sm font-medium'>
            <span>Page</span>
            <Select defaultValue='1'>
              <SelectTrigger className='w-fit rounded-sm' id='rows-per-page'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent side='top'>
                {[1, 2, 3, 4, 5].map((page) => (
                  <SelectItem key={page} value={`${page}`}>
                    {page}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>of 5</span>
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
              expenses?.map((expense) => (
                <Expense
                  key={expense.id}
                  expense={expense}
                  showActions={true}
                  displayDate='date'
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default BookExpenses;
