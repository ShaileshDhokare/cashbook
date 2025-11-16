import { Button } from '@/components/ui/button';
import {
  CalendarDays,
  Check,
  ChevronsUpDown,
  Equal,
  Search,
  Sigma,
  X,
} from 'lucide-react';

import BookExpenses from '@/components/content/BookExpenses';
import ExpenseForm from '@/components/content/ExpenseForm';
import { Calendar } from '@/components/ui/calendar';
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
  InputGroupButton,
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
import { getRupeeSymbol } from '@/utils/commonUtils';
import { useState } from 'react';

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
  { id: 1, name: 'Credit Card' },
  { id: 2, name: 'Debit Card' },
  { id: 3, name: 'Cash' },
  { id: 4, name: 'UPI' },
];

const BookDetail = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('this_month');
  const [fromDateOpen, setFromDateOpen] = useState(false);
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDateOpen, setToDateOpen] = useState(false);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);

  return (
    <div className='header-margin pb-5'>
      <div className='container mx-auto h-min-screen'>
        <div className='my-4 bg-blue-100 text-blue-800 rounded-xs p-2 text-center'>
          <h1 className='text-2xl font-semibold mb-1'>Book Detail Page</h1>
          <span className='text-sm'>
            A book to track monthly expenses at home like rent, groceries, and
            utilities.
          </span>
        </div>
        <div>
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
            <div className='col-span-3 bg-white p-4 rounded border'>
              {selectedDuration === 'custom_range' && (
                <div className='flex gap-4 mb-4'>
                  <div className='flex gap-0 items-center bg-slate-100 text-slate-800 px-2 rounded-xs'>
                    <span className='text-base font-medium'>Duration:</span>
                    <Select
                      defaultValue='this_month'
                      onValueChange={(value) => setSelectedDuration(value)}
                      value={selectedDuration}
                    >
                      <SelectTrigger className='border-0 shadow-none px-1 gap-0.5 text-base focus-visible:border-0 focus-visible:ring-0'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Duration</SelectLabel>
                          <SelectItem value='this_month'>This Month</SelectItem>
                          <SelectItem value='last_month'>Last Month</SelectItem>
                          <SelectItem value='this_year'>This Year</SelectItem>
                          <SelectItem value='all_time'>All Time</SelectItem>
                          <SelectItem value='custom_range'>
                            Custom Range
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <span className='text-base font-medium mx-2'>From:</span>
                    <Popover open={fromDateOpen} onOpenChange={setFromDateOpen}>
                      <PopoverTrigger
                        asChild
                        className='border-0 bg-transparent hover:bg-transparent text-base font-normal px-1 has-[>svg]:px-1'
                      >
                        <Button
                          variant='outline'
                          id='date'
                          className='justify-between font-normal'
                        >
                          {fromDate
                            ? fromDate.toLocaleDateString()
                            : 'Select date'}
                          <CalendarDays />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className='w-auto overflow-hidden p-0'
                        align='start'
                      >
                        <Calendar
                          mode='single'
                          selected={fromDate}
                          captionLayout='dropdown'
                          onSelect={(date) => {
                            setFromDate(date);
                            setFromDateOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <span className='text-base font-medium mx-2'>To:</span>
                    <Popover open={toDateOpen} onOpenChange={setToDateOpen}>
                      <PopoverTrigger
                        asChild
                        className='border-0 bg-transparent hover:bg-transparent text-base font-normal px-1 has-[>svg]:px-1'
                      >
                        <Button
                          variant='outline'
                          id='date'
                          className='justify-between font-normal'
                        >
                          {toDate ? toDate.toLocaleDateString() : 'Select date'}
                          <CalendarDays />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className='w-auto overflow-hidden p-0'
                        align='start'
                      >
                        <Calendar
                          mode='single'
                          selected={toDate}
                          captionLayout='dropdown'
                          onSelect={(date) => {
                            setToDate(date);
                            setToDateOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
              <div className='flex flex-col md:flex-row gap-4 mb-4'>
                {selectedDuration !== 'custom_range' && (
                  <div className='flex gap-0 items-center bg-slate-100 text-slate-800 px-2 rounded-xs'>
                    <span className='text-base font-medium'>Duration:</span>
                    <Select
                      defaultValue='this_month'
                      onValueChange={(value) => setSelectedDuration(value)}
                      value={selectedDuration}
                    >
                      <SelectTrigger className='border-0 shadow-none px-1 gap-0.5 text-base focus-visible:border-0 focus-visible:ring-0'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Duration</SelectLabel>
                          <SelectItem value='this_month'>This Month</SelectItem>
                          <SelectItem value='last_month'>Last Month</SelectItem>
                          <SelectItem value='this_year'>This Year</SelectItem>
                          <SelectItem value='all_time'>All Time</SelectItem>
                          <SelectItem value='custom_range'>
                            Custom Range
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
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
                  <InputGroupInput placeholder='Search by remark or amount...' />
                  <InputGroupAddon align='inline-end'>
                    <InputGroupButton size='icon-sm'>
                      <Search />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {/* <Button className='rounded-xs'>Add New Expense</Button> */}
                <ExpenseForm
                  categories={expenseCategories}
                  paymentModes={paymentModes}
                />
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
                    <h1 className='text-2xl md:text-4xl font-medium'>
                      {getRupeeSymbol()}50000
                    </h1>
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
                    <h1 className='text-2xl md:text-4xl font-medium'>
                      {getRupeeSymbol()}100000
                    </h1>
                  </div>
                </div>
              </div>
              <BookExpenses />
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
