import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { SquarePen, Trash2 } from 'lucide-react';
import type { PaymentMode } from '../utils/types';

const paymentModesData: PaymentMode[] = [
  {
    id: 1,
    user_id: 1,
    name: 'Cash',
    is_active: true,
    created_at: '2023-10-01',
  },
  {
    id: 2,
    user_id: 1,
    name: 'Credit Card',
    is_active: true,
    created_at: '2023-10-05',
  },
  {
    id: 3,
    user_id: 1,
    name: 'Debit Card',
    is_active: true,
    created_at: '2023-10-07',
  },
  {
    id: 4,
    user_id: 1,
    name: 'Bank Transfer',
    is_active: false,
    created_at: '2023-10-10',
  },
  {
    id: 5,
    user_id: 1,
    name: 'Mobile Wallet',
    is_active: true,
    created_at: '2023-10-12',
  },
];

const PaymentModes = () => {
  return (
    <div className='header-margin pb-5'>
      <div className='container mx-auto'>
        <div className='flex justify-end p-3'>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button className='rounded-xs'>Add New Payment Mode</Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Add New Payment Mode</DialogTitle>
                </DialogHeader>
                <div className='grid gap-3'>
                  <div className='grid gap-2'>
                    <Label htmlFor='name'>Name</Label>
                    <Input id='name' name='name' />
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
                Status
              </TableHead>
              <TableHead className='px-4 py-2 text-left border border-gray-200'>
                Created At
              </TableHead>
              <TableHead className='px-4 py-2 text-left border border-gray-200'>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentModesData.map((paymentMode) => (
              <TableRow key={paymentMode.id}>
                <TableCell className='px-4 py-2 font-medium border border-gray-200'>
                  {paymentMode.id}
                </TableCell>
                <TableCell className='px-4 py-2 text-base font-medium border border-gray-200'>
                  {paymentMode.name}
                </TableCell>
                <TableCell className='px-4 py-2 border border-gray-200'>
                  {paymentMode.is_active ? 'Active' : 'Inactive'}
                </TableCell>
                <TableCell className='px-4 py-2 border border-gray-200'>
                  {paymentMode.created_at}
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

export default PaymentModes;
