import { useUpdateCategory } from '@/services/categoryServices';
import type { Category as CategoryType } from '@/utils/types';
import { CircleMinus, SquarePen } from 'lucide-react';
import { useState } from 'react';
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
import { Input } from '../ui/input';
import { Spinner } from '../ui/spinner';

type CategoryProps = {
  category: CategoryType;
};

const Category = ({ category }: CategoryProps) => {
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const { mutate: updateCategory, isPending: updateCategoryPending } =
    useUpdateCategory(Number(category.book_id));

  return (
    <div className='flex gap-3'>
      <AlertDialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <AlertDialogTrigger>
          <span className='text-zinc-400 hover:text-zinc-800'>
            <SquarePen className='w-4' />
          </span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-base font-medium'>
              Do you want to rename this category?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            <Input
              placeholder='Enter category name'
              value={newCategoryName || category.name}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                updateCategory(
                  { id: category.id, name: newCategoryName },
                  { onSuccess: () => setNewCategoryName('') }
                )
              }
            >
              {updateCategoryPending && <Spinner className='mr-2' />}
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <AlertDialogTrigger>
          <span className='text-red-600 hover:text-red-800'>
            <CircleMinus className='w-4' />
          </span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-base font-medium'>
              Do you want to deactivate this category?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                updateCategory({ id: category.id, is_active: false })
              }
              className='bg-red-600 hover:bg-red-700'
            >
              {updateCategoryPending && <Spinner className='mr-2' />}
              Deactivate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Category;
