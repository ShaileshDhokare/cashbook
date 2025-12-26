import { Button } from '@/components/ui/button';
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useAddCategory, useCategories } from '@/services/categoryServices';
import {
  useAddExpense,
  useUpdateExpense,
  type ExpenseWithDetails,
} from '@/services/expenseServices';
import { usePaymentModes } from '@/services/paymentModeServices';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CalendarDays,
  Check,
  ChevronsUpDown,
  Plus,
  Settings,
  SquarePen,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as z from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Spinner } from '../ui/spinner';
import CategoryList from './CategoryList';
import { format } from 'date-fns';

const CategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long.' })
    .max(50, { message: 'Name cannot exceed 50 characters.' }),
});

const ExpenseSchema = z.object({
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

type ExpenseFormProps = {
  isEdit?: boolean;
  expense?: ExpenseWithDetails;
};

const ExpenseForm = ({ isEdit = false, expense }: ExpenseFormProps) => {
  const { bookId } = useParams();
  const userId = useAuthStore((state: any) => state.userId);

  const { data: categories } = useCategories(userId, Number(bookId));
  const { data: paymentModes } = usePaymentModes(userId);
  const { mutate: addCategory, isPending: isAddingCategory } = useAddCategory(
    Number(bookId)
  );
  const { mutate: addExpense, isPending: isAddingExpense } = useAddExpense(
    Number(bookId),
    userId
  );

  const { mutate: updateExpense, isPending: isUpdatingExpense } =
    useUpdateExpense(Number(bookId), userId);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [manageCategory, setManageCategory] = useState(false);
  const [addCategoryMode, setAddCategoryMode] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addCategoryError, setAddCategoryError] = useState('');
  const [open, setOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      amount: undefined,
      remark: '',
      date: new Date(),
      category_id: '',
      payment_mode_id: '',
    },
  });

  useEffect(() => {
    if (expense) {
      setValue('amount', expense.amount);
      setValue('remark', expense.remark);
      setValue('date', new Date(expense.date));
      setValue('category_id', expense.category_id.toString());
      setValue('payment_mode_id', expense.payment_mode_id.toString());
    }
  }, [expense]);

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
        book_id: Number(bookId),
        is_active: true,
      },
      {
        onSuccess: () => {
          setNewCategoryName('');
          setAddCategoryMode(false);
        },
      }
    );
  };

  const onSubmit = (data: ExpenseFormData) => {
    if (isEdit && expense) {
      updateExpense(
        {
          id: expense.id,
          amount: Number(data.amount),
          remark: data.remark,
          date: format(data.date, 'yyyy-MM-dd'),
          category_id: Number(data.category_id),
          payment_mode_id: Number(data.payment_mode_id),
        },
        {
          onSuccess: () => {
            setOpen(false);
            reset();
          },
        }
      );
    } else {
      addExpense(
        {
          amount: Number(data.amount),
          remark: data.remark,
          date: format(data.date, 'yyyy-MM-dd'),
          category_id: Number(data.category_id),
          payment_mode_id: Number(data.payment_mode_id),
          book_id: Number(bookId),
          user_id: userId,
        },
        {
          onSuccess: () => {
            setOpen(false);
            reset();
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <span className='text-zinc-400 hover:text-zinc-800'>
            <SquarePen className='w-5' />
          </span>
        ) : (
          <Button className='rounded-xs'>Add New Expense</Button>
        )}
      </DialogTrigger>
      <DialogContent className='rounded-xs'>
        {!manageCategory && (
          <>
            <DialogHeader>
              <DialogTitle className='hidden md:block'>
                Add New Expense
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className='grid gap-3'>
              <div className='grid gap-3 max-w-[90%] md:max-w-full'>
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
                            className={cn(
                              'justify-between font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              field.value.toLocaleDateString()
                            ) : (
                              <span>Select date</span>
                            )}
                            <CalendarDays className='ml-2 h-4 w-4 opacity-50' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={(event) => {
                              field.onChange(event);
                              setDateOpen(false);
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
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
              <div className='grid gap-3 max-w-[90%] md:max-w-full'>
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
              <div className='grid gap-3 max-w-[90%] md:max-w-full'>
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
              <div className='grid gap-3'>
                <div className='grid gap-3'>
                  <div className='flex justify-between items-center max-w-[90%] md:max-w-full'>
                    <Label htmlFor='category'>Category</Label>
                    <Button
                      variant='secondary'
                      size='sm'
                      onClick={() => setManageCategory(!manageCategory)}
                      type='button'
                    >
                      <Settings className='h-4 w-4 mr-2' />
                      Manage
                    </Button>
                  </div>
                  <div className='flex gap-4 justify-between max-w-[90%] md:max-w-full'>
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
                              className='md:w-[280px] justify-between font-normal'
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
                          <PopoverContent className='w-[200px] p-0 max-h-[200px] overflow-y-auto'>
                            <Command>
                              <CommandInput placeholder='Search category...' />
                              <CommandList className='h-36 overflow-auto'>
                                <CommandEmpty>No category found.</CommandEmpty>
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

                    <Button
                      variant='outline'
                      onClick={() => setAddCategoryMode(!addCategoryMode)}
                      type='button'
                    >
                      {addCategoryMode ? (
                        <>
                          <X className='h-4 w-4 mr-2' />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Plus className='h-4 w-4 mr-2' />
                          Add New
                        </>
                      )}
                    </Button>
                  </div>
                  {errors.category_id && (
                    <p className='text-sm text-red-500'>
                      {errors.category_id.message}
                    </p>
                  )}
                </div>
              </div>
              {addCategoryMode && (
                <div className='flex flex-col gap-2 max-w-[90%] md:max-w-full'>
                  <div className='flex justify-between items-center gap-4'>
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
                    >
                      {isAddingCategory && <Spinner />} Save
                    </Button>
                  </div>
                  {addCategoryError && (
                    <p className='text-sm text-red-500'>{addCategoryError}</p>
                  )}
                </div>
              )}
              <div className='grid gap-3 max-w-[90%] md:max-w-full'>
                <div className='grid gap-2'>
                  <Label htmlFor='paymentMode'>Payment Mode</Label>
                  <Controller
                    control={control}
                    name='payment_mode_id'
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='w-[240px]'>
                          <SelectValue placeholder='Select Payment Mode' />
                        </SelectTrigger>
                        <SelectContent className='max-h-[200px] overflow-y-auto'>
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
              <div className='flex gap-4 justify-end max-w-[90%] md:max-w-full'>
                <DialogClose asChild>
                  <Button variant='outline' size='sm' className='rounded-xs'>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type='submit'
                  size='sm'
                  className='rounded-xs'
                  disabled={isAddingExpense || isUpdatingExpense}
                >
                  {isAddingExpense ||
                    (isUpdatingExpense && <Spinner className='mr-2' />)}
                  {isEdit ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </>
        )}
        {manageCategory && (
          <CategoryList setManageCategory={setManageCategory} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseForm;
