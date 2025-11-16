import type { Category } from '../../utils/types';
import { CirclePlus, CircleMinus } from 'lucide-react';
import { Button } from '../ui/button';

const CategoryData: Category[] = [
  { id: 1, name: 'Food', is_active: true },
  { id: 2, name: 'Transport', is_active: false },
  { id: 3, name: 'Utilities', is_active: true },
  { id: 4, name: 'Entertainment', is_active: true },
  { id: 5, name: 'Health', is_active: true },
  { id: 6, name: 'Education', is_active: false },
  { id: 7, name: 'Shopping', is_active: true },
  { id: 8, name: 'Travel', is_active: false },
  { id: 9, name: 'Miscellaneous', is_active: true },
];

type CategoryListProps = {
  categories?: Category[];
  setManageCategory?: (value: boolean) => void;
};

const CategoryList = ({ setManageCategory }: CategoryListProps) => {
  return (
    <div className='p-3 mt-2'>
      <div className='flex justify-end'>
        <Button
          size='sm'
          onClick={() => setManageCategory && setManageCategory(false)}
        >
          Save Changes
        </Button>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-base font-medium'>Active</span>
        {CategoryData.filter((category) => category.is_active).map(
          (category) => (
            <span className='pl-3 flex items-center justify-between border'>
              <p>{category.name}</p>
              <Button variant='ghost' size='icon'>
                <CircleMinus />
              </Button>
            </span>
          )
        )}
        <span className='text-base font-medium'>Inactive</span>
        {CategoryData.filter((category) => !category.is_active).map(
          (category) => (
            <span className='pl-3 flex items-center justify-between border'>
              <p>{category.name}</p>
              <Button variant='ghost' size='icon'>
                <CirclePlus />
              </Button>
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default CategoryList;
