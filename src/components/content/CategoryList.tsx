import { CirclePlus, CircleMinus } from 'lucide-react';
import { Button } from '../ui/button';
import { useCategories, useUpdateCategory } from '@/services/categoryServices';
import { Spinner } from '../ui/spinner';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

type CategoryListProps = {
  setManageCategory?: (value: boolean) => void;
};

const CategoryList = ({ setManageCategory }: CategoryListProps) => {
  const { bookId } = useParams();
  const userId = useAuthStore((state: any) => state.userId);
  const { data: categories } = useCategories(userId, Number(bookId));

  const { mutate: updateCategory, isPending: isUpdatingCategory } =
    useUpdateCategory();

  return (
    <div className='p-3 mt-2'>
      <div className='flex justify-end'>
        <Button
          size='sm'
          onClick={() => setManageCategory && setManageCategory(false)}
          disabled={isUpdatingCategory}
        >
          {isUpdatingCategory && <Spinner />} Save Changes
        </Button>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-base font-medium'>Active</span>
        {categories
          ?.filter((category) => category.is_active)
          .map((category) => (
            <span className='pl-3 flex items-center justify-between border'>
              <p>{category.name}</p>
              <Button
                variant='ghost'
                size='icon'
                onClick={() =>
                  updateCategory({ id: category.id, is_active: false })
                }
              >
                <CircleMinus />
              </Button>
            </span>
          ))}
        <span className='text-base font-medium'>Inactive</span>
        {categories
          ?.filter((category) => !category.is_active)
          .map((category) => (
            <span className='pl-3 flex items-center justify-between border'>
              <p>{category.name}</p>
              <Button
                variant='ghost'
                size='icon'
                onClick={() =>
                  updateCategory({ id: category.id, is_active: true })
                }
              >
                <CirclePlus />
              </Button>
            </span>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
