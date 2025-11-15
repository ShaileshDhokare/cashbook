import { Button } from '@/components/ui/button';
import { SquarePen, Trash2 } from 'lucide-react';
import { Item, ItemContent } from '@/components/ui/item';
import {
  getFormattedDate,
  getFormattedTime,
  getRupeeSymbol,
} from '@/utils/commonUtils';
import type { ExpenseShow } from '@/utils/types';

type ExpenseProps = {
  expense: ExpenseShow;
  showActions?: boolean;
  displayDate: 'created_at' | 'date';
};

const Expense = ({
  expense,
  showActions = true,
  displayDate,
}: ExpenseProps) => {
  const { id, category, payment_mode, amount, remark, created_at, date } =
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
                  className='text-zinc-500 hover:text-zinc-700'
                  size='icon'
                >
                  <SquarePen />
                </Button>
                <Button
                  variant='ghost'
                  className='text-rose-400 hover:text-rose-600'
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
            {category}
          </span>
          <span className='px-1 text-sm border rounded-sm bg-indigo-100 text-indigo-800'>
            {payment_mode}
          </span>
          {getExpenseDate(displayDate)}
        </div>
      </ItemContent>
    </Item>
  );
};

export default Expense;
