import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ExpenseWithDetails } from '@/services/expenseServices';
import Loader from './Loader';
import { getFormattedDate } from '@/utils/commonUtils';

type ExpenseTableProps = {
  expenses?: ExpenseWithDetails[];
  isLoading?: boolean;
};

const ExpenseTable = ({ expenses, isLoading }: ExpenseTableProps) => {
  return (
    <div>
      <Table className='w-min md:w-full border-collapse'>
        <TableHeader>
          <TableRow className='text-base'>
            <TableHead className='p-2 text-left border border-gray-200'>
              Date
            </TableHead>
            <TableHead className='p-2 text-left border border-gray-200'>
              Remark
            </TableHead>
            <TableHead className='p-2 text-left border border-gray-200'>
              Amount
            </TableHead>
            <TableHead className='p-2 text-left border border-gray-200'>
              Category
            </TableHead>
            <TableHead className='p-2 text-left border border-gray-200'>
              Payment Mode
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses?.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className='p-2 border border-gray-200'>
                {getFormattedDate(expense.date)}
              </TableCell>
              <TableCell className='p-2 text-base font-medium border border-gray-200'>
                {expense.remark}
              </TableCell>
              <TableCell className='p-2 text-base font-medium border border-gray-200'>
                {expense.amount}
              </TableCell>
              <TableCell className='p-2 border border-gray-200'>
                <span className='px-1 text-sm border rounded-sm bg-purple-100 text-purple-800'>
                  {expense?.categories?.name}
                </span>
              </TableCell>
              <TableCell className='p-2 border border-gray-200'>
                <span className='px-1 text-sm border rounded-sm bg-indigo-100 text-indigo-800'>
                  {expense?.payment_modes?.name}
                </span>
              </TableCell>
            </TableRow>
          ))}
          {isLoading && (
            <TableRow className='hover:bg-transparent'>
              <TableCell colSpan={5}>
                <Loader show={true} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseTable;
