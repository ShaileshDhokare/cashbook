import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '../ui/card';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { useBooksWithTotalExpenses } from '@/services/bookServices';
import { useAuthStore } from '@/store/authStore';
import { getRupeeSymbol } from '@/utils/commonUtils';
import { Link } from 'react-router-dom';

const Books = () => {
  const userId = useAuthStore((state: any) => {
    return state.userId;
  });

  const { data: books } = useBooksWithTotalExpenses(userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Books</CardTitle>
      </CardHeader>
      <CardContent className='px-4'>
        <div className='flex w-full flex-col gap-4'>
          {books?.map((book) => (
            <Item key={book.id} variant='outline'>
              <ItemContent>
                <div className='flex flex-row justify-between'>
                  <ItemTitle className='text-xl'>{book.name}</ItemTitle>
                  <Button variant='secondary' size='sm' asChild>
                    <Link to={`/book/${book.id}`}>View</Link>
                  </Button>
                </div>
                <ItemDescription>{book.description}</ItemDescription>
                <div className='w-full mt-4 flex flex-row gap-4 justify-between items-center'>
                  <h1 className='text-2xl font-bold'>
                    {getRupeeSymbol()}
                    {new Intl.NumberFormat('en-IN').format(book.all_time)}
                  </h1>
                  <p className='text-base font-semibold'>
                    <span className='text-gray-500'>This Month:</span>{' '}
                    {getRupeeSymbol()}
                    {new Intl.NumberFormat('en-IN').format(book.this_month)}
                  </p>
                  <p className='text-base font-semibold'>
                    <span className='text-gray-500'>This Year:</span>{' '}
                    {getRupeeSymbol()}
                    {new Intl.NumberFormat('en-IN').format(book.this_year)}
                  </p>
                </div>
              </ItemContent>
            </Item>
          ))}
        </div>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Link to='/books'>
          <Button>Manage Books</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Books;
