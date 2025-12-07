import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { CalendarDays } from 'lucide-react';
import type { DurationTypes } from '@/utils/types';

type DurationSelectorProps = {
  selectedDuration: DurationTypes;
  setSelectedDuration: (duration: DurationTypes) => void;
  setCustomDuration?: (duration: { startDate: Date; endDate: Date }) => void;
};

const DurationSelector = ({
  selectedDuration,
  setSelectedDuration,
  setCustomDuration,
}: DurationSelectorProps) => {
  const [fromDateOpen, setFromDateOpen] = useState(false);
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDateOpen, setToDateOpen] = useState(false);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (fromDate && toDate) {
      setCustomDuration?.({
        startDate: fromDate,
        endDate: toDate,
      });
    }
  }, [fromDate, toDate]);

  if (selectedDuration === 'custom_range') {
    return (
      <div className='flex gap-4 mb-4'>
        <div className='flex gap-0 items-center bg-slate-100 text-slate-800 px-2 rounded-xs'>
          <span className='text-base font-medium'>Duration:</span>
          <Select
            defaultValue='this_month'
            onValueChange={(value: DurationTypes) => setSelectedDuration(value)}
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
                <SelectItem value='custom_range'>Custom Range</SelectItem>
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
                {fromDate ? fromDate.toLocaleDateString() : 'Select date'}
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
    );
  }
  return (
    <div className='flex gap-0 items-center bg-slate-100 text-slate-800 px-2 rounded-xs'>
      <span className='text-base font-medium'>Duration:</span>
      <Select
        defaultValue='this_month'
        onValueChange={(value: DurationTypes) => setSelectedDuration(value)}
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
            <SelectItem value='custom_range'>Custom Range</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DurationSelector;
