import { Button } from '@/components/ui/button';
import { SquarePen, Trash2 } from 'lucide-react';
import { Item, ItemContent } from '@/components/ui/item';
import {
  getFormattedDate,
  getFormattedTime,
  getRupeeSymbol,
} from '@/utils/commonUtils';
import type { ExpenseWithDetails } from '@/services/expenseServices';

type ExpenseProps = {
  expense: ExpenseWithDetails;
  showActions?: boolean;
  displayDate: 'created_at' | 'date';
};

const Expense = ({
  expense,
  showActions = true,
  displayDate,
}: ExpenseProps) => {
  const { categories, payment_modes, amount, remark, created_at, date } =
    expense;

  const getExpenseDate = (
    displayDate: 'created_at' | 'date'
  ): React.ReactElement => {
    switch (displayDate) {
      case 'created_at':
        return (
          <span className='px-1 text-sm border rounded-sm bg-slate-100 text-slate-800'>
            {getFormattedDate(created_at)}{' '}
            <span className='text-neutral-400 font-semibold'>|</span>{' '}
            {getFormattedTime(created_at)}
          </span>
        );
      case 'date':
        return (
          <span className='px-1 text-sm border rounded-sm bg-slate-100 text-slate-800'>
            {getFormattedDate(date)}
          </span>
        );
    }
  };

  return (
    <Item variant='outline' className='p-2'>
      <ItemContent className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <div className='text-base font-medium'>
            <span>{remark}</span>
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-lg font-medium mr-4'>
              {getRupeeSymbol()}
              {amount}
            </span>
            {showActions && (
              <>
                <Button
                  variant='ghost'
                  className='text-zinc-400 hover:text-zinc-800'
                  size='icon'
                >
                  <SquarePen />
                </Button>
                <Button
                  variant='ghost'
                  className='text-red-400 hover:text-red-800'
                  size='icon'
                >
                  <Trash2 />
                </Button>
              </>
            )}
          </div>
        </div>
        <div className='flex gap-2 w-full'>
          <span className='px-1 text-sm border rounded-sm bg-purple-100 text-purple-800'>
            {categories?.name}
          </span>
          <span className='px-1 text-sm border rounded-sm bg-indigo-100 text-indigo-800'>
            {payment_modes?.name}
          </span>
          {getExpenseDate(displayDate)}
        </div>
      </ItemContent>
    </Item>
  );
};

export default Expense;
