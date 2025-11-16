import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SquarePen, Trash2 } from 'lucide-react';
import type { BookEntry } from '../utils/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

const booksData: BookEntry[] = [
  {
    id: 1,
    name: 'Personal Finance',
    description: 'Track your personal expenses',
    is_active: true,
    created_at: '2023-10-01',
  },
  {
    id: 2,
    name: 'Budget Planner',
    description: 'Plan monthly budgets and set financial goals',
    is_active: true,
    created_at: '2023-11-12',
  },
  {
    id: 3,
    name: 'Investment Guide',
    description: 'Basics of investing and portfolio tracking',
    is_active: false,
    created_at: '2022-08-20',
  },
  {
    id: 4,
    name: 'Small Business Ledger',
    description: 'Record income and expenses for small businesses',
    is_active: true,
    created_at: '2024-01-05',
  },
  {
    id: 5,
    name: 'Savings Tracker',
    description: 'Monitor savings goals and progress',
    is_active: true,
    created_at: '2023-06-30',
  },
  {
    id: 6,
    name: 'Retirement Planner',
    description: 'Estimate retirement needs and plan contributions',
    is_active: false,
    created_at: '2021-12-15',
  },
  {
    id: 7,
    name: 'Expense Analyzer',
    description: 'Categorize and analyze spending habits',
    is_active: true,
    created_at: '2024-03-22',
  },
  {
    id: 8,
    name: 'Tax Organizer',
    description: 'Organize deductions and prepare for tax season',
    is_active: false,
    created_at: '2022-04-10',
  },
  {
    id: 9,
    name: 'Invoice Manager',
    description: 'Create and track invoices and payments',
    is_active: true,
    created_at: '2023-09-01',
  },
  {
    id: 10,
    name: 'Fundamentals of Accounting',
    description: 'Core accounting principles for bookkeeping',
    is_active: true,
    created_at: '2020-07-19',
  },
];

const BooksList = () => {
  return (
    <div className='header-margin pb-5'>
      <div className='container mx-auto'>
        <div className='flex justify-end p-3'>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button className='rounded-xs'>Add New Book</Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Add New Book</DialogTitle>
                </DialogHeader>
                <div className='grid gap-3'>
                  <div className='grid gap-2'>
                    <Label htmlFor='name'>Name</Label>
                    <Input id='name' name='name' />
                  </div>
                </div>
                <div className='grid gap-3'>
                  <div className='grid gap-2'>
                    <Label htmlFor='description'>Description</Label>
                    <Input id='description' name='description' />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant='outline' size='sm' className='rounded-xs'>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type='submit' size='sm' className='rounded-xs'>
                    Add
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
        <Table className='mt-3 w-full border-collapse'>
          <TableHeader>
            <TableRow className='text-base'>
              <TableHead className='px-4 py-2 text-left border border-gray-200'>
                Id
              </TableHead>
              <TableHead className='px-4 py-2 text-left border border-gray-200'>
                Name
              </TableHead>
              <TableHead className='px-4 py-2 text-left border border-gray-200'>
                Description
              </TableHead>
              <TableHead className='px-4 py-2 text-left border border-gray-200'>
                Status
              </TableHead>
              <TableHead className='px-4 py-2 text-left border border-gray-200'>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {booksData.map((book) => (
              <TableRow key={book.id}>
                <TableCell className='px-4 py-2 font-medium border border-gray-200'>
                  {book.id}
                </TableCell>
                <TableCell className='px-4 py-2 text-base font-medium border border-gray-200'>
                  <Link to={`/book/${book.id}`}>{book.name}</Link>
                </TableCell>
                <TableCell className='px-4 py-2 border border-gray-200'>
                  {book.description}
                </TableCell>
                <TableCell className='px-4 py-2 border border-gray-200'>
                  {book.is_active ? (
                    <span className='px-2 py-1 font-medium rounded-4xl bg-green-200 text-green-800'>
                      Active
                    </span>
                  ) : (
                    <span className='px-2 py-1 font-medium rounded-4xl bg-red-200 text-red-800'>
                      Inactive
                    </span>
                  )}
                </TableCell>
                <TableCell className='px-4 py-2 border border-gray-200 w-fit'>
                  <div className='flex gap-2'>
                    <Button
                      variant='ghost'
                      className='text-zinc-400 hover:text-zinc-800'
                    >
                      <SquarePen className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      className='text-red-400 hover:text-red-800'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BooksList;
