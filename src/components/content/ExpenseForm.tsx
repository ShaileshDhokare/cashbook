import { Button } from '@/components/ui/button';
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
import type { Category, PaymentMode } from '@/utils/types';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useState } from 'react';
import {
  CalendarDays,
  Check,
  ChevronsUpDown,
  Plus,
  Settings,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import CategoryList from './CategoryList';

type ExpenseFormProps = {
  categories: Category[];
  paymentModes: PaymentMode[];
};

const ModalContent = ({ categories, paymentModes }: ExpenseFormProps) => {
  const [expenseDateOpen, setExpenseDateOpen] = useState(false);
  const [expenseDate, setExpenseDate] = useState<Date | undefined>(undefined);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');
  const [manageCategory, setManageCategory] = useState(false);
  const [addCategory, setAddCategory] = useState(false);

  if (manageCategory) {
    return <CategoryList setManageCategory={setManageCategory} />;
  } else {
    return (
      <>
        <DialogHeader>
          <DialogTitle className='hidden md:block'>Add New Expense</DialogTitle>
        </DialogHeader>
        <div className='grid gap-3'>
          <div className='grid gap-2'>
            <Label htmlFor='date'>Date</Label>
            <Popover open={expenseDateOpen} onOpenChange={setExpenseDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  id='date'
                  className='justify-between font-normal'
                >
                  {expenseDate
                    ? expenseDate.toLocaleDateString()
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
                  selected={expenseDate}
                  captionLayout='dropdown'
                  onSelect={(date) => {
                    setExpenseDate(date);
                    setExpenseDateOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className='grid gap-3'>
          <div className='grid gap-2'>
            <Label htmlFor='amount'>Amount</Label>
            <Input type='number' id='amount' name='amount' />
          </div>
        </div>
        <div className='grid gap-3'>
          <div className='grid gap-2'>
            <Label htmlFor='remark'>Remark</Label>
            <Input id='remark' name='remark' />
          </div>
        </div>
        <div className='grid gap-3'>
          <div className='grid gap-3'>
            <div className='flex justify-between items-center'>
              <Label htmlFor='remark'>Category</Label>
              <Button
                variant='secondary'
                size='sm'
                onClick={() => setManageCategory(!manageCategory)}
              >
                <Settings />
                Manage
              </Button>
            </div>
            <div className='flex gap-4 justify-between'>
              <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                <PopoverTrigger
                  asChild
                  className='w-[240px] justify-between font-normal'
                >
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={categoryOpen}
                  >
                    {categoryValue
                      ? categories.find(
                          (category) => category.name === categoryValue
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
                        {categories.map((category) => (
                          <CommandItem
                            key={category.id}
                            value={category.name}
                            onSelect={(currentValue) => {
                              setCategoryValue(
                                currentValue === categoryValue
                                  ? ''
                                  : currentValue
                              );
                              setCategoryOpen(false);
                            }}
                          >
                            {category.name}
                            <Check
                              className={cn(
                                'ml-auto',
                                categoryValue === category.name
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
              <Button
                variant='outline'
                onClick={() => setAddCategory(!addCategory)}
              >
                {addCategory ? (
                  <>
                    <X />
                    Cancel
                  </>
                ) : (
                  <>
                    <Plus />
                    Add New
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        {addCategory && (
          <div className='flex justify-between items-center gap-4'>
            <Input name='newCategory' placeholder='New Category Name' />
            <Button>Save</Button>
          </div>
        )}
        <div className='grid gap-3'>
          <div className='grid gap-2'>
            <Label htmlFor='paymentMode'>Payment Mode</Label>
            <Select defaultValue='4'>
              <SelectTrigger className='w-[240px]'>
                <SelectValue />
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
        </div>
        <div className='flex gap-4 justify-end'>
          <DialogClose asChild>
            <Button variant='outline' size='sm' className='rounded-xs'>
              Cancel
            </Button>
          </DialogClose>
          <Button type='submit' size='sm' className='rounded-xs'>
            Add
          </Button>
        </div>
      </>
    );
  }
};

const ExpenseForm = ({ categories, paymentModes }: ExpenseFormProps) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className='rounded-xs'>Add New Expense</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px] rounded-xs'>
          <ModalContent categories={categories} paymentModes={paymentModes} />
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ExpenseForm;
