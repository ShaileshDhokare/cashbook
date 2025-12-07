import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SquarePen, Trash2 } from 'lucide-react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAddBook, useBooks } from '@/services/bookServices';
import { useAuthStore } from '@/store/authStore';
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useState } from 'react';
import Loader from '@/components/content/Loader';

const BookSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long.' })
    .max(50, { message: 'Name cannot exceed 50 characters.' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 3 characters long.' })
    .max(200, { message: 'Description cannot exceed 200 characters.' }),
});

export type NewBookFormData = z.infer<typeof BookSchema>;

const BooksList = () => {
  const userId = useAuthStore((state: any) => {
    return state.userId;
  });
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data: books, isLoading } = useBooks(userId);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NewBookFormData>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });
  const {
    mutate,
    isPending,
    isError,
    isSuccess,
    data: newBookData,
  } = useAddBook();

  const onSubmit = (data: NewBookFormData) => {
    mutate({
      ...data,
      user_id: userId,
      is_active: true,
    });
  };

  useEffect(() => {
    if (!isError && isSuccess && newBookData) {
      setOpenModal(false);
    }
  }, [newBookData, isSuccess, isError]);

  return (
    <div className='header-margin pb-5'>
      <div className='container mx-auto'>
        <div className='flex justify-end p-3'>
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <form>
              <DialogTrigger asChild>
                <Button className='rounded-xs'>Add New Book</Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Add New Book</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='flex flex-col gap-4'
                >
                  <div className='grid gap-3'>
                    <div className='grid gap-2'>
                      <Label htmlFor='name'>Name</Label>
                      <Input type='text' id='name' {...register('name')} />
                      {errors.name && (
                        <p className='text-sm text-red-500'>
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='grid gap-3'>
                    <div className='grid gap-2'>
                      <Label htmlFor='description'>Description</Label>
                      <Input
                        type='text'
                        id='description'
                        {...register('description')}
                      />
                      {errors.description && (
                        <p className='text-sm text-red-500'>
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        className='rounded-xs'
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type='submit'
                      size='sm'
                      className='rounded-xs'
                      disabled={isPending || !isValid}
                    >
                      {isPending && <Spinner />} Add
                    </Button>
                  </DialogFooter>
                </form>
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
            {books?.map((book) => (
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
    </div>
  );
};

export default BooksList;
