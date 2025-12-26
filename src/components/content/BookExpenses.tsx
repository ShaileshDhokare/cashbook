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
import { groupExpensesByDate } from '@/utils/commonUtils';
import { format } from 'date-fns';
import ExpenseTable from './ExpenseTable';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useState } from 'react';

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
  const {
    totalItems = 0,
    totalPages = 0,
    currentPage = 1,
    from = 0,
    to = 0,
  } = paginationData ?? {};

  const [showTableView, setShowTableView] = useState<boolean>(false);

  if (!isLoading && (!expenses || expenses.length === 0)) {
    return (
      <div className='flex flex-col items-center justify-center h-24 w-full'>
        <p className='text-gray-500 text-lg'>No expenses found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className='flex justify-end mb-2'>
        <div className='flex items-center space-x-2'>
          <Switch
            checked={showTableView}
            onCheckedChange={setShowTableView}
            id='show-table-view'
          />
          <Label htmlFor='show-table-view'>Table View</Label>
        </div>
      </div>
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
            <Button
              variant='outline'
              className='rounded-sm'
              size='icon'
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage && setCurrentPage(currentPage - 1);
              }}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant='outline'
              className='rounded-sm'
              size='icon'
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage && setCurrentPage(currentPage + 1);
              }}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
      <div className='rounded-sm'>
        {showTableView ? (
          <ExpenseTable expenses={expenses} isLoading={isLoading} />
        ) : (
          <ScrollArea className='h-[500px] md:h-[700px] w-full p-3 bg-neutral-100'>
            <div className='flex flex-col gap-3'>
              {isLoading ? (
                <Loader show={isLoading} />
              ) : (
                groupExpensesByDate(expenses || []).map(
                  ({ date, expenses }) => (
                    <div className='flex flex-col gap-3' key={date}>
                      <div className='text-base font-semibold text-neutral-600 w-full flex justify-center items-center my-1'>
                        {format(date, 'dd MMMM yyyy')}
                      </div>
                      {expenses?.map((expense) => (
                        <Expense
                          key={expense.id}
                          expense={expense}
                          showActions={true}
                        />
                      ))}
                    </div>
                  )
                )
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default BookExpenses;
