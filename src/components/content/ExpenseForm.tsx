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
import { useCategories } from '@/services/categoryServices';
import {
  useUpdateExpense,
  type ExpenseWithDetails,
} from '@/services/expenseServices';
import { usePaymentModes } from '@/services/paymentModeServices';
import { useAuthStore } from '@/store/authStore';
import { useBookStore } from '@/store/bookStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarDays, Check, ChevronsUpDown, SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
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
  expense: ExpenseWithDetails;
};

const ExpenseForm = ({ expense }: ExpenseFormProps) => {
  const { bookId } = useParams();
  const userId = useAuthStore((state: any) => state.userId);
  const setShowNewExpense = useBookStore(
    (state: any) => state.setShowNewExpense
  );

  const { data: categories } = useCategories(userId, Number(bookId));
  const { data: paymentModes } = usePaymentModes(userId);

  const { mutate: updateExpense, isPending: isUpdatingExpense } =
    useUpdateExpense(Number(bookId), userId);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  useEffect(() => {
    setShowNewExpense(!open);
  }, [open]);

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

  const onSubmit = (data: ExpenseFormData) => {
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
          toast.success('Expense updated successfully');
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className='text-zinc-400 hover:text-zinc-800'>
          <SquarePen className='w-5' />
        </span>
      </DialogTrigger>
      <DialogContent className='w-84'>
        <DialogHeader>
          <DialogTitle>Update Expense</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid gap-3 items-center justify-center'
        >
          <div className='grid gap-3 w-64'>
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
                <p className='text-sm text-red-500'>{errors.date.message}</p>
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
                <p className='text-sm text-red-500'>{errors.amount.message}</p>
              )}
            </div>
          </div>
          <div className='grid gap-3 w-64'>
            <div className='grid gap-2'>
              <Label htmlFor='remark'>Remark</Label>
              <Input id='remark' {...register('remark')} />
              {errors.remark && (
                <p className='text-sm text-red-500'>{errors.remark.message}</p>
              )}
            </div>
          </div>
          <div className='grid gap-3 w-64'>
            <div className='grid gap-3'>
              <Label htmlFor='category'>Category</Label>
              <Controller
                control={control}
                name='category_id'
                render={({ field }) => (
                  <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
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
                    <PopoverContent className='w-64 p-0 overflow-y-auto'>
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
                                      field.value === category.id.toString()
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
              <Label htmlFor='paymentMode'>Payment Mode</Label>
              <Controller
                control={control}
                name='payment_mode_id'
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select Payment Mode' />
                    </SelectTrigger>
                    <SelectContent className='overflow-y-auto'>
                      <SelectGroup>
                        <SelectLabel>Payment Mode</SelectLabel>
                        {paymentModes?.map((mode) => (
                          <SelectItem key={mode.id} value={mode.id.toString()}>
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
          <div className='flex gap-4 justify-end w-64'>
            <DialogClose asChild>
              <Button variant='outline' size='sm' className='rounded-xs'>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              size='sm'
              className='rounded-xs'
              disabled={isUpdatingExpense}
            >
              {isUpdatingExpense && <Spinner className='mr-2' />}
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseForm;
