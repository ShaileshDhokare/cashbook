import { Button } from '@/components/ui/button';
import { Item, ItemContent } from '@/components/ui/item';
import {
  useDeleteExpense,
  type ExpenseWithDetails,
} from '@/services/expenseServices';
import { useAuthStore } from '@/store/authStore';
import {
  getFormattedDate,
  getFormattedTime,
  getRupeeSymbol,
} from '@/utils/commonUtils';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Spinner } from '../ui/spinner';
import ExpenseForm from './ExpenseForm';

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { id, categories, payment_modes, amount, remark, created_at, date } =
    expense;

  const { bookId } = useParams();
  const userId = useAuthStore((state: any) => state.userId);

  const { mutate: deleteExpense, isPending: deleteExpensePending } =
    useDeleteExpense(Number(bookId), userId);

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

  const handleDeleteExpense = () => {
    deleteExpense(id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
      },
    });
  };

  return (
    <Item variant='outline' className='p-2'>
      <ItemContent className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <div className='text-base font-semibold md:font-medium '>
            <span>{remark}</span>
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-lg font-semibold md:font-medium mr-4 '>
              {getRupeeSymbol()}
              {amount}
            </span>
            {showActions && (
              <>
                <ExpenseForm isEdit expense={expense} />
                <AlertDialog
                  open={deleteDialogOpen}
                  onOpenChange={setDeleteDialogOpen}
                >
                  <AlertDialogTrigger>
                    <Button
                      variant='ghost'
                      className='text-red-400 hover:text-red-800'
                      size='icon'
                    >
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the expense.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteExpense}>
                        {deleteExpensePending && <Spinner className='mr-2' />}
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
