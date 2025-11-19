import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
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
import { getRupeeSymbol } from '@/utils/commonUtils';
import { Link } from 'react-router-dom';

const Books = () => {
  const data = [
    {
      id: 1,
      title: 'Monthly Expense Tracker',
      desc: 'A book to track monthly expenses at home like rent, groceries, and utilities.',
      amount: 10000,
      thisMonth: 2000,
      thisYear: 5000,
    },
    {
      id: 2,
      title: 'Business Expenses',
      desc: 'Track business-related expenses, invoices, and reimbursements.',
      amount: 250000,
      thisMonth: 45000,
      thisYear: 120000,
    },
    {
      id: 3,
      title: 'Travel Fund',
      desc: 'Plan and track travel savings and trip-related expenses.',
      amount: 50000,
      thisMonth: 5000,
      thisYear: 15000,
    },
    {
      id: 4,
      title: 'Savings Goals',
      desc: 'Monitor savings goals for short and long term plans.',
      amount: 150000,
      thisMonth: 10000,
      thisYear: 40000,
    },
    {
      id: 5,
      title: 'Household Budget',
      desc: 'Manage household recurring costs and one-off purchases.',
      amount: 80000,
      thisMonth: 12000,
      thisYear: 30000,
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Books</CardTitle>
        <CardAction>
          <Button variant='outline' size='sm'>
            Add New Book
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className='px-4'>
        <div className='flex w-full flex-col gap-4'>
          {data.map((book) => (
            <Item key={book.id} variant='outline'>
              <ItemContent>
                <div className='flex flex-row justify-between'>
                  <ItemTitle className='text-xl'>{book.title}</ItemTitle>
                  <Button variant='secondary' size='sm' asChild>
                    <Link to={`/book/${book.id}`}>View</Link>
                  </Button>
                </div>
                <ItemDescription>{book.desc}</ItemDescription>
                <div className='w-full mt-4 flex flex-row gap-4 justify-between items-center'>
                  <h1 className='text-2xl font-bold'>
                    {getRupeeSymbol()}
                    {new Intl.NumberFormat('en-IN').format(book.amount)}
                  </h1>
                  <p className='text-base font-semibold'>
                    <span className='text-gray-500'>This Month:</span>{' '}
                    {getRupeeSymbol()}
                    {new Intl.NumberFormat('en-IN').format(book.thisMonth)}
                  </p>
                  <p className='text-base font-semibold'>
                    <span className='text-gray-500'>This Year:</span>{' '}
                    {getRupeeSymbol()}
                    {new Intl.NumberFormat('en-IN').format(book.thisYear)}
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
