import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  startOfYear,
  endOfYear,
  format,
} from 'date-fns';
import type { DateRange, DurationTypes } from './types';

export function getRupeeSymbol(): React.ReactElement {
  return <span>&#x20B9;</span>;
}

export function getFormattedDate(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = date
    .toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    .replace(/\//g, '-');
  return formattedDate;
}

export function getFormattedTime(dateString: string): string {
  const date = new Date(dateString);
  const formattedTime = date
    .toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .replace(/([ap])\.?m\.?/i, (match) => match.toUpperCase().replace('.', ''));
  return formattedTime;
}

export const getCurrentMonthDateRange = () => {
  const now = new Date();
  return {
    startDate: format(startOfMonth(now), 'yyyy-MM-dd'),
    endDate: format(endOfMonth(now), 'yyyy-MM-dd'),
  };
};

export const getLastMonthDateRange = () => {
  const now = new Date();
  const lastMonth = subMonths(now, 1);
  return {
    startDate: format(startOfMonth(lastMonth), 'yyyy-MM-dd'),
    endDate: format(endOfMonth(lastMonth), 'yyyy-MM-dd'),
  };
};

export const getCurrentYearDateRange = () => {
  const now = new Date();
  return {
    startDate: format(startOfYear(now), 'yyyy-MM-dd'),
    endDate: format(endOfYear(now), 'yyyy-MM-dd'),
  };
};

export const getAllTimeDateRange = () => {
  const now = new Date();
  return {
    startDate: format(new Date('2025-01-01'), 'yyyy-MM-dd'),
    endDate: format(now, 'yyyy-MM-dd'),
  };
};

export const getCustomDateRange = (fromDate: Date, toDate: Date): DateRange => {
  if (!fromDate || !toDate) {
    return getAllTimeDateRange();
  }
  return {
    startDate: format(fromDate, 'yyyy-MM-dd'),
    endDate: format(toDate, 'yyyy-MM-dd'),
  };
};

export const getExpensesByDuration = (
  selectedDuration: DurationTypes,
  customDuration?: { startDate: Date | undefined; endDate: Date | undefined }
): DateRange => {
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
