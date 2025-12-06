import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, Equal, Sigma, X } from 'lucide-react';

import BookExpenses from '@/components/content/BookExpenses';
import DurationSelector from '@/components/content/DurationSelector';
import ExpenseForm from '@/components/content/ExpenseForm';
import Loader from '@/components/content/Loader';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useBooks } from '@/services/bookServices';
import {
  useExpensesByBook,
  useTotalOfExpenses,
} from '@/services/expenseServices';
import { useAuthStore } from '@/store/authStore';
import {
  getAllTimeDateRange,
  getCurrentMonthDateRange,
  getCurrentYearDateRange,
  getCustomDateRange,
  getLastMonthDateRange,
  getRupeeSymbol,
} from '@/utils/commonUtils';
import type { DateRange } from '@/utils/types';
import useDebounce from '@/utils/useDebounce';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const expenseCategories = [
  { id: 1, name: 'Rent' },
  { id: 2, name: 'Groceries' },
  { id: 3, name: 'Utilities' },
  { id: 4, name: 'Transport' },
  { id: 5, name: 'Entertainment' },
  { id: 6, name: 'Healthcare' },
  { id: 7, name: 'Education' },
  { id: 8, name: 'Subscriptions' },
  { id: 9, name: 'Dining Out' },
  { id: 10, name: 'Clothing' },
  { id: 11, name: 'Miscellaneous' },
];

const paymentModes = [
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

const BookDetail = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('this_month');
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

  const { bookId } = useParams();

  const userId = useAuthStore((state: any) => {
    return state.userId;
  });

  const getExpensesByDuration = () => {
    switch (selectedDuration) {
      case 'this_month':
        return getCurrentMonthDateRange();
      case 'last_month':
        return getLastMonthDateRange();
      case 'this_year':
        return getCurrentYearDateRange();
      case 'all_time':
        return getAllTimeDateRange();
      case 'custom_range':
        return getCustomDateRange(
          customDuration?.startDate!,
          customDuration?.endDate!
        );
    }
  };

  const { startDate, endDate } = getExpensesByDuration() as DateRange;
  const filters = {
    startDate,
    endDate,
    categoryIds: [],
    paymentModeIds: [],
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

  return (
    <div className='header-margin pb-5'>
      <div className='container mx-auto h-min-screen'>
        <div className='my-4 bg-blue-100 text-blue-800 rounded-xs p-2 text-center'>
          <h1 className='text-2xl font-semibold mb-1'>{currentBook?.name}</h1>
          <span className='text-sm'>{currentBook?.description}</span>
        </div>
        <div>
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
            <div className='col-span-3 bg-white p-4 rounded border'>
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
                <div className='flex gap-0 items-center bg-purple-100 text-purple-800 px-2 rounded-xs'>
                  <span className='text-base font-medium'>Category:</span>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger
                      asChild
                      className='border-0 bg-transparent hover:bg-transparent text-base font-normal px-1 has-[>svg]:px-1'
                    >
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={open}
                      >
                        {value
                          ? expenseCategories.find(
                              (category) => category.id.toString() === value
                            )?.name
                          : 'Select Category'}
                        <ChevronsUpDown className='opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-0'>
                      <Command>
                        <CommandInput
                          placeholder='Search category...'
                          className='h-9'
                        />
                        <CommandList>
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {expenseCategories.map((category) => (
                              <CommandItem
                                key={category.id}
                                value={category.id.toString()}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? '' : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                {category.name}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    value === category.id.toString()
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='flex gap-0 items-center bg-indigo-100 text-indigo-800 px-2 rounded-xs'>
                  <span className='text-base font-medium'>Payment Mode:</span>
                  <Select>
                    <SelectTrigger className='border-0 shadow-none px-1 gap-0.5 text-base focus-visible:border-0 focus-visible:ring-0'>
                      <SelectValue placeholder='Select Mode' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Payment Mode</SelectLabel>
                        {paymentModes.map((mode) => (
                          <SelectItem key={mode.id} value={mode.id.toString()}>
                            {mode.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant='ghost'
                  className='rounded-xs gap-0.5 bg-red-100 hover:bg-red-200 text-red-800 hover:text-red-900'
                >
                  <X />
                  Clear
                </Button>
              </div>
              <div className='flex gap-4 mb-4'>
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
            <div className='col-span-2 bg-white p-4 rounded shadow'>
              <h1>Analysis</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
