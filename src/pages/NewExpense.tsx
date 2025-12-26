import CategoryList from '@/components/content/CategoryList';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { useBooks } from '@/services/bookServices';
import { useCategories } from '@/services/categoryServices';
import { useAddExpense } from '@/services/expenseServices';
import { usePaymentModes } from '@/services/paymentModeServices';
import { useAuthStore } from '@/store/authStore';
import { useBookStore } from '@/store/bookStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarDays, Check, ChevronsUpDown, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import z from 'zod';

const ExpenseSchema = z.object({
  book_id: z.string().min(1, 'Book is required'),
  amount: z
    .number({ message: 'Amount is required' })
    .min(1, { message: 'Amount must be greater than 1' }),
  remark: z
    .string()
    .min(3, { message: 'Remark must be at least 5 characters long.' }),
  date: z.date(),
  category_id: z.string().min(1, 'Category is required'),
  payment_mode_id: z.string().min(1, 'Payment mode is required'),
});

type ExpenseFormData = z.infer<typeof ExpenseSchema>;

const NewExpense = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState<number | undefined>(undefined);
  const [dateOpen, setDateOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [addNew, setAddNew] = useState(false);

  const [manageCategory, setManageCategory] = useState(false);

  const userId = useAuthStore((state: any) => state.userId);
  const setShowNewExpense = useBookStore(
    (state: any) => state.setShowNewExpense
  );
  const activeBookId = useBookStore((state: any) => {
    return state.activeBookId;
  });

  const { data: books } = useBooks(userId);

  const { data: categories } = useCategories(userId, Number(book));
  const { data: paymentModes } = usePaymentModes(userId);

  const { mutate: addExpense, isPending: isAddingExpense } = useAddExpense(
    Number(book),
    userId
  );

  useEffect(() => {
    setShowNewExpense(false);
    return () => {
      setShowNewExpense(true);
    };
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      book_id: activeBookId?.toString() || '',
      amount: undefined,
      remark: '',
      date: new Date(),
      category_id: '',
      payment_mode_id: '',
    },
  });

  useEffect(() => {
    if (activeBookId) {
      setBook(activeBookId);
    }
  }, [activeBookId]);

  useEffect(() => {
    if (book) {
      setValue('category_id', '');
    }
  }, [book]);

  const onSubmit = (data: ExpenseFormData, isAddNew: boolean) => {
    setAddNew(isAddNew);
    addExpense(
      {
        amount: Number(data.amount),
        remark: data.remark,
        date: format(data.date, 'yyyy-MM-dd'),
        category_id: Number(data.category_id),
        payment_mode_id: Number(data.payment_mode_id),
        book_id: Number(data.book_id),
        user_id: userId,
      },
      {
        onSuccess: () => {
          toast.success('Expense added successfully.', {
            description: `The expense of ${data.amount} has been added to the book.`,
          });
          setAddNew(false);
          if (isAddNew) {
            setValue('category_id', '');
            setValue('amount', 0);
            setValue('remark', '');
          } else {
            navigate(`/book/${book}`);
          }
        },
      }
    );
  };

  return (
    <div className='header-margin pb-5'>
      <div className='container mx-auto'>
        <div className='flex flex-col items-center justify-center px-2'>
          <Card className='w-84'>
            <CardHeader>
              <CardTitle>
                {manageCategory ? 'Manage Category' : 'Add New Expense'}
              </CardTitle>
              {manageCategory && (
                <CardAction>
                  <Button
                    size='sm'
                    variant='secondary'
                    onClick={() => setManageCategory(false)}
                  >
                    Save
                  </Button>
                </CardAction>
              )}
            </CardHeader>
            <CardContent>
              {!manageCategory && (
                <form
                  onSubmit={handleSubmit((data) => onSubmit(data, false))}
                  className='grid gap-3 items-center justify-center'
                >
                  <div className='grid gap-3 w-64'>
                    <div className='grid gap-2'>
                      <Label htmlFor='book_id'>Book</Label>
                      <Controller
                        control={control}
                        name='book_id'
                        render={({ field }) => (
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              setBook(Number(value));
                            }}
                            defaultValue={
                              field.value === ''
                                ? book?.toString()
                                : field.value
                            }
                          >
                            <SelectTrigger className='w-64'>
                              <SelectValue placeholder='Select Book' />
                            </SelectTrigger>
                            <SelectContent className='w-64 overflow-y-auto'>
                              <SelectGroup>
                                <SelectLabel>Book</SelectLabel>
                                {books?.map((book) => (
                                  <SelectItem
                                    key={book.id}
                                    value={book.id.toString()}
                                  >
                                    {book.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.book_id && (
                        <p className='text-sm text-red-500'>
                          {errors.book_id.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='grid gap-3'>
                    <div className='grid gap-2'>
                      <Label htmlFor='date'>Date</Label>
                      <Controller
                        control={control}
                        name='date'
                        render={({ field }) => (
                          <Popover open={dateOpen} onOpenChange={setDateOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant='outline'
                                id='date'
                                className='w-64 justify-between font-normal'
                              >
                                {field.value ? (
                                  field.value.toLocaleDateString()
                                ) : (
                                  <span>Select date</span>
                                )}
                                <CalendarDays className='ml-2 h-4 w-4 opacity-50' />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className='w-auto p-0'
                              align='start'
                            >
                              <Calendar
                                mode='single'
                                selected={field.value}
                                onSelect={(event) => {
                                  field.onChange(event);
                                  setDateOpen(false);
                                }}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date('1900-01-01')
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                      {errors.date && (
                        <p className='text-sm text-red-500'>
                          {errors.date.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='grid gap-3 w-64'>
                    <div className='grid gap-2'>
                      <Label htmlFor='amount'>Amount</Label>
                      <Input
                        type='number'
                        id='amount'
                        {...register('amount', { valueAsNumber: true })}
                      />
                      {errors.amount && (
                        <p className='text-sm text-red-500'>
                          {errors.amount.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='grid gap-3 w-64'>
                    <div className='grid gap-2'>
                      <Label htmlFor='remark'>Remark</Label>
                      <Input id='remark' {...register('remark')} />
                      {errors.remark && (
                        <p className='text-sm text-red-500'>
                          {errors.remark.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='grid gap-3 w-64'>
                    <div className='grid gap-2'>
                      <div className='flex justify-between items-end w-full'>
                        <Label htmlFor='category'>Category</Label>
                        <Button
                          variant='secondary'
                          size='sm'
                          onClick={() => setManageCategory(!manageCategory)}
                          type='button'
                          disabled={!book}
                        >
                          <Settings className='h-4 w-4 mr-2' />
                          Manage
                        </Button>
                      </div>
                      <Controller
                        control={control}
                        name='category_id'
                        render={({ field }) => (
                          <Popover
                            open={categoryOpen}
                            onOpenChange={setCategoryOpen}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant='outline'
                                role='combobox'
                                aria-expanded={categoryOpen}
                                className='justify-between font-normal'
                              >
                                {field.value
                                  ? categories?.find(
                                      (category) =>
                                        category.id.toString() === field.value
                                    )?.name
                                  : 'Select Category'}
                                <ChevronsUpDown className='ml-2 h-4 w-4 opacity-50' />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className='overflow-y-auto w-64 p-0'>
                              <Command>
                                <CommandInput placeholder='Search category...' />
                                <CommandList className='h-36 overflow-auto'>
                                  <CommandEmpty>
                                    No category found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {categories
                                      ?.filter((category) => category.is_active)
                                      .map((category) => (
                                        <CommandItem
                                          key={category.id}
                                          value={category.name}
                                          onSelect={() => {
                                            setValue(
                                              'category_id',
                                              category.id.toString(),
                                              { shouldValidate: true }
                                            );
                                            setCategoryOpen(false);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              'mr-2 h-4 w-4',
                                              field.value ===
                                                category.id.toString()
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                            )}
                                          />
                                          {category.name}
                                        </CommandItem>
                                      ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                      {errors.category_id && (
                        <p className='text-sm text-red-500'>
                          {errors.category_id.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='grid gap-3 w-64'>
                    <div className='grid gap-2'>
                      <div className='flex justify-between items-end w-full'>
                        <Label htmlFor='paymentMode'>Payment Mode</Label>
                        <Button variant='secondary' size='sm' type='button'>
                          <Settings className='h-4 w-4 mr-2' />
                          <Link to='/payment-modes'>Manage</Link>
                        </Button>
                      </div>
                      <Controller
                        control={control}
                        name='payment_mode_id'
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className='w-64'>
                              <SelectValue placeholder='Select Payment Mode' />
                            </SelectTrigger>
                            <SelectContent className='w-64 overflow-y-auto'>
                              <SelectGroup>
                                <SelectLabel>Payment Mode</SelectLabel>
                                {paymentModes?.map((mode) => (
                                  <SelectItem
                                    key={mode.id}
                                    value={mode.id.toString()}
                                  >
                                    {mode.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.payment_mode_id && (
                        <p className='text-sm text-red-500'>
                          {errors.payment_mode_id.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <Button
                      type='submit'
                      className='rounded-xs w-24 cursor-pointer'
                      disabled={isAddingExpense || !isValid}
                    >
                      {isAddingExpense && !addNew && (
                        <Spinner className='mr-2' />
                      )}
                      Save
                    </Button>
                    <Button
                      type='submit'
                      variant='secondary'
                      className='rounded-xs w-36 cursor-pointer'
                      disabled={isAddingExpense || !isValid}
                      onClick={handleSubmit((data) => onSubmit(data, true))}
                    >
                      {isAddingExpense && addNew && (
                        <Spinner className='mr-2' />
                      )}
                      Save & Add New
                    </Button>
                  </div>
                </form>
              )}
              {manageCategory && <CategoryList book={book} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewExpense;
