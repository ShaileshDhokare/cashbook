import {
  useAddCategory,
  useCategories,
  useUpdateCategory,
} from '@/services/categoryServices';
import { useAuthStore } from '@/store/authStore';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
import z from 'zod';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Spinner } from '../ui/spinner';
import Category from './Category';

type CategoryListProps = {
  book?: number;
};

const CategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long.' })
    .max(50, { message: 'Name cannot exceed 50 characters.' }),
});

const CategoryList = ({ book }: CategoryListProps) => {
  const userId = useAuthStore((state: any) => state.userId);
  const { data: categories } = useCategories(userId, Number(book));
  const { mutate: addCategory, isPending: isAddingCategory } = useAddCategory(
    Number(book)
  );
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addCategoryError, setAddCategoryError] = useState('');

  const handleAddCategory = () => {
    const validation = CategorySchema.safeParse({ name: newCategoryName });
    if (!validation.success) {
      setAddCategoryError(validation.error.issues[0].message);
      return;
    }
    setAddCategoryError('');

    addCategory(
      {
        name: newCategoryName,
        user_id: userId,
        book_id: Number(book),
        is_active: true,
      },
      {
        onSuccess: () => {
          setNewCategoryName('');
        },
      }
    );
  };

  const { mutate: updateCategory, isPending: updateCategoryPending } =
    useUpdateCategory(Number(book));

  return (
    <div>
      <div className='flex flex-col gap-1 w-full mb-2'>
        <div className='flex justify-between items-center gap-1'>
          <Input
            name='newCategory'
            placeholder='New Category Name'
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button
            onClick={handleAddCategory}
            disabled={isAddingCategory}
            type='button'
            className='w-20'
          >
            {isAddingCategory && <Spinner />} Add
          </Button>
        </div>
        {addCategoryError && (
          <p className='text-sm text-red-500'>{addCategoryError}</p>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-base font-medium'>Active</span>
        {categories
          ?.filter((category) => category.is_active)
          .map((category) => (
            <span
              className='p-2 flex items-center justify-between border'
              key={category.id}
            >
              <p className='text-md font-medium'>{category.name}</p>
              <Category category={category} />
            </span>
          ))}
        <span className='text-base font-medium'>Inactive</span>
        {categories
          ?.filter((category) => !category.is_active)
          .map((category) => (
            <span className='p-2 flex items-center justify-between border'>
              <p className='text-md font-medium'>{category.name}</p>
              <AlertDialog
                open={actionDialogOpen}
                onOpenChange={(event) => setActionDialogOpen(event)}
              >
                <AlertDialogTrigger>
                  <span className='text-green-600 hover:text-green-800'>
                    <CirclePlus className='w-4' />
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='text-base font-medium'>
                      Do you want to ativate this category?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        updateCategory({ id: category.id, is_active: true })
                      }
                    >
                      {updateCategoryPending && <Spinner className='mr-2' />}
                      Activate
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </span>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
