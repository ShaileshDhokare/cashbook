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
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';

const Books = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>Books</CardTitle>
          <CardAction>
            <Button variant='outline' size='sm'>
              Add New Book
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className='flex w-full flex-col gap-6'>
            {[
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
            ].map((book) => (
              <Item key={book.id} variant='outline' className='shadow-md'>
                <ItemContent>
                  <div className='flex flex-row justify-between'>
                    <ItemTitle className='text-xl'>{book.title}</ItemTitle>
                    <Button variant='outline' size='sm'>
                      View
                    </Button>
                  </div>
                  <ItemDescription>{book.desc}</ItemDescription>
                  <div className='w-full mt-4 flex flex-row justify-between items-center'>
                    <h1 className='text-2xl font-bold'>
                      &#x20B9;
                      {new Intl.NumberFormat('en-IN').format(book.amount)}
                    </h1>
                    <p className='text-base font-semibold'>
                      <span className='text-gray-500'>This Month:</span>{' '}
                      &#x20B9;
                      {new Intl.NumberFormat('en-IN').format(book.thisMonth)}
                    </p>
                    <p className='text-base font-semibold'>
                      <span className='text-gray-500'>This Year:</span> &#x20B9;
                      {new Intl.NumberFormat('en-IN').format(book.thisYear)}
                    </p>
                  </div>
                </ItemContent>
              </Item>
            ))}
          </div>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button variant='outline'>Manage Books</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Books;
