import { Button } from '@/components/ui/button';
import { Equal, Sigma, X } from 'lucide-react';

import BookExpenses from '@/components/content/BookExpenses';
import DurationSelector from '@/components/content/DurationSelector';
import ExpenseForm from '@/components/content/ExpenseForm';
import Loader from '@/components/content/Loader';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import MultiSelect from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useBooks } from '@/services/bookServices';
import {
  useExpensesByBook,
  useTotalOfExpenses,
} from '@/services/expenseServices';
import { useAuthStore } from '@/store/authStore';
import { getExpensesByDuration, getRupeeSymbol } from '@/utils/commonUtils';
import type { DateRange, DurationTypes } from '@/utils/types';
import useDebounce from '@/utils/useDebounce';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCategories } from '@/services/categoryServices';
import { usePaymentModes } from '@/services/paymentModeServices';

const BookDetail = () => {
  const [selectedDuration, setSelectedDuration] =
    useState<DurationTypes>('this_month');
  const [customDuration, setCustomDuration] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [amountQuery, setAmountQuery] = useState<{
    condition: 'gte' | 'lte';
    amount: number;
  }>({
    condition: 'gte',
    amount: 0,
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPaymentModes, setSelectedPaymentModes] = useState<string[]>(
    []
  );

  const { bookId } = useParams();

  const userId = useAuthStore((state: any) => {
    return state.userId;
  });

  const { data: bookCategories } = useCategories(userId, Number(bookId));
  const { data: paymentModes } = usePaymentModes(userId);

  const { startDate, endDate } = getExpensesByDuration(
    selectedDuration,
    customDuration
  ) as DateRange;
  const filters = {
    startDate,
    endDate,
    categoryIds: useDebounce(selectedCategories, 1500).map((id) => Number(id)),
    paymentModeIds: useDebounce(selectedPaymentModes, 1500).map((id) =>
      Number(id)
    ),
    searchQuery: useDebounce(searchQuery, 1500),
    amountQuery: {
      condition: amountQuery.condition,
      amount: useDebounce(amountQuery.amount, 1500),
    },
  };

  const { data: books } = useBooks(userId);
  const currentBook = books?.find((book: any) => book.id === Number(bookId));

  const {
    data: BookExpenseData,
    isLoading: BookExpensesLoading,
    error: BookExpensesError,
  } = useExpensesByBook(Number(bookId), userId, filters);

  const {
    data: totalExpensesOfAllTime,
    isLoading: totalExpensesOfAllTimeLoading,
  } = useTotalOfExpenses(Number(bookId), userId);

  const {
    data: totalExpensesOfDuration,
    isLoading: totalExpensesOfDurationLoading,
  } = useTotalOfExpenses(Number(bookId), userId, filters);

  const clearAllFilters = () => {
    setSelectedDuration('this_month');
    setCustomDuration(undefined);
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedPaymentModes([]);
    setAmountQuery({
      condition: 'gte',
      amount: 0,
    });
  };

  return (
    <div className='header-margin pb-5'>
      <div className='container mx-auto h-min-screen'>
        <div className='my-2 bg-blue-100 text-blue-800 rounded-xs p-2 text-center'>
          <h1 className='text-2xl font-semibold mb-1'>{currentBook?.name}</h1>
          <span className='text-sm'>{currentBook?.description}</span>
        </div>
        <div>
          <div className='grid grid-cols-1 lg:grid-cols-9 gap-4'>
            <div className='col-start-2 col-span-7 bg-white p-4 rounded border'>
              {selectedDuration === 'custom_range' && (
                <DurationSelector
                  selectedDuration={selectedDuration}
                  setSelectedDuration={setSelectedDuration}
                  setCustomDuration={setCustomDuration}
                />
              )}
              <div className='flex flex-col md:flex-row gap-4 mb-4'>
                {selectedDuration !== 'custom_range' && (
                  <DurationSelector
                    selectedDuration={selectedDuration}
                    setSelectedDuration={setSelectedDuration}
                  />
                )}
                <div className='flex gap-0 items-center w-fit bg-purple-100 text-purple-800 px-2 rounded-xs max-w-[280px]'>
                  <span className='text-base font-medium'>Category:</span>
                  <MultiSelect
                    options={bookCategories?.map((category) => ({
                      value: category.id.toString(),
                      label: category.name,
                    }))}
                    selected={selectedCategories}
                    onChange={setSelectedCategories}
                    placeholder='Choose categories...'
                  />
                </div>
                <div className='flex gap-0 items-center w-fit bg-indigo-100 text-indigo-800 px-2 rounded-xs max-w-[280px]'>
                  <span className='text-base font-medium'>Pay Mode:</span>
                  <MultiSelect
                    options={paymentModes?.map((mode) => ({
                      value: mode.id.toString(),
                      label: mode.name,
                    }))}
                    selected={selectedPaymentModes}
                    onChange={setSelectedPaymentModes}
                    placeholder='Choose...'
                    showSearch={false}
                    showActions={false}
                  />
                </div>
                <Button
                  variant='ghost'
                  className='rounded-xs gap-0.5 bg-red-100 hover:bg-red-200 text-red-800 hover:text-red-900 max-w-[120px]'
                  onClick={clearAllFilters}
                >
                  <X />
                  Clear
                </Button>
              </div>
              <div className='flex sm:flex-row flex-col gap-4 mb-4 justify-between'>
                <div className='flex gap-4 w-full'>
                  <InputGroup className='rounded-xs'>
                    <InputGroupInput
                      placeholder='Search by remark...'
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className='rounded-xs'>
                    <InputGroupAddon align='inline-start'>
                      <Select
                        defaultValue='gte'
                        onValueChange={(value) =>
                          setAmountQuery({
                            ...amountQuery,
                            condition: value as 'gte' | 'lte',
                          })
                        }
                      >
                        <SelectTrigger className='border-0 shadow-none px-1 gap-1 text-base font-medium'>
                          <SelectValue placeholder='' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem className='font-medium' value='gte'>
                              Amount <span className='text-lg'> &ge;</span>
                            </SelectItem>
                            <SelectItem className='font-medium' value='lte'>
                              Amount <span className='text-lg'> &le;</span>
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </InputGroupAddon>
                    <InputGroupInput
                      type='number'
                      placeholder='Enter search query'
                      onChange={(e) =>
                        setAmountQuery({
                          ...amountQuery,
                          amount: Number(e.target.value),
                        })
                      }
                    />
                  </InputGroup>
                </div>
                <ExpenseForm />
              </div>
              <div className='grid grid-cols-9 border rounded-sm p-3 mb-4'>
                <div className='col-span-4 flex gap-2 items-center justify-center'>
                  <div className='flex flex-col align-top h-full'>
                    <span className='p-2 mt-1 rounded-full border bg-indigo-100 text-indigo-900'>
                      <Sigma className='w-[25px] h-[25px]' />
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='font-medium text-base'>
                      Selected Period
                    </span>
                    {totalExpensesOfDurationLoading ? (
                      <Loader show={totalExpensesOfDurationLoading} />
                    ) : (
                      <h1 className='text-2xl md:text-4xl font-medium'>
                        {getRupeeSymbol()}
                        {(totalExpensesOfDuration &&
                          totalExpensesOfDuration[0]?.sum) ||
                          0}
                      </h1>
                    )}
                  </div>
                </div>
                <div className='col-span-1 flex justify-center'>
                  <Separator orientation='vertical' />
                </div>
                <div className='col-span-4 flex gap-2 items-center justify-center'>
                  <div className='flex flex-col align-top h-full'>
                    <span className='p-2 mt-1 rounded-full border bg-green-100 text-green-900'>
                      <Equal className='w-[25px] h-[25px]' />
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='font-medium text-base'>All Time</span>
                    {totalExpensesOfAllTimeLoading ? (
                      <Loader show={totalExpensesOfAllTimeLoading} />
                    ) : (
                      <h1 className='text-2xl md:text-4xl font-medium'>
                        {getRupeeSymbol()}{' '}
                        {(totalExpensesOfAllTime &&
                          totalExpensesOfAllTime[0]?.sum) ||
                          0}
                      </h1>
                    )}
                  </div>
                </div>
              </div>
              <BookExpenses
                expenses={BookExpenseData?.data}
                isLoading={BookExpensesLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
