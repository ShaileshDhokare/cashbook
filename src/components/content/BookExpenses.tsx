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
import { sampleExpenses } from './TopExpenses';

const BookExpenses = () => {
  return (
    <div>
      <div className='flex items-center justify-between mb-3 px-3'>
        <div className='text-sm font-medium'>
          <span>Showing 1-25 of 100 entries</span>
        </div>
        <div className='flex w-full items-center gap-3 lg:w-fit'>
          <div className='flex w-fit items-center justify-center gap-2 text-sm font-medium'>
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
        <div className='flex flex-col gap-3'>
          {sampleExpenses.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              showActions={true}
              displayDate='created_at'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookExpenses;
