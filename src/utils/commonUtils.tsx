import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  startOfYear,
  endOfYear,
  format,
} from 'date-fns';
import type { AnalysisChartResponse, DateRange, DurationTypes } from './types';
import type { ChartConfig } from '@/components/ui/chart';
import type { ExpenseWithDetails } from '@/services/expenseServices';

export function getRupeeSymbol(): React.ReactElement {
  return <span>&#x20B9;</span>;
}

export function getFormattedDate(dateString: string): string {
  return format(dateString, 'dd MMM yyyy');
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

export const CHART_COLOR_PALETTE: readonly string[] = [
  '#1D4ED8', // Blue-700 (theme)
  '#0891B2', // Cyan-600
  '#8B5CF6', // Purple-500
  '#14B8A6', // Teal-500
  '#6366F1', // Indigo-500
  '#22C55E', // Green-500
  '#0EA5E9', // Sky-500
  '#7C3AED', // Violet-500
  '#60A5FA', // Blue-400
  '#059669', // Emerald-600
  '#9CA3AF', // Gray-400
  '#A78BFA', // Indigo-400
  '#10B981', // Emerald-500
  '#64748B', // Slate-500
  '#84CC16', // Lime-500
  '#F59E0B', // Amber-500
  '#CBAA04', // Yellow-600
  '#EF4444', // Red-500
  '#D946EF', // Fuchsia-500
  '#F97316', // Orange-500
  '#EC4899', // Pink-500
];

export const getShortMonthName = (monthNumber: number): string => {
  const date = new Date(2000, monthNumber - 1, 1);
  return format(date, 'MMM');
};

export const buildChartData = (
  data: AnalysisChartResponse[] | undefined,
  dataKey: 'book_name' | 'category_name'
): any[] => {
  const chartDataMap = data?.reduce((acc: any, row: AnalysisChartResponse) => {
    const monthKey = `${getShortMonthName(row.month_number)} ${
      row.year_number
    }`;
    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthKey,
      };
    }
    const key = row[dataKey];
    if (key) {
      acc[monthKey][key] = row.total_expense;
    }
    return acc;
  }, {});

  return Object.values(chartDataMap ?? {}) || [];
};

export const getAnalysisChartConfig = (
  data: AnalysisChartResponse[],
  dataKey: 'book_name' | 'category_name'
): ChartConfig => {
  const uniqueBooks = new Set(data?.map((item) => item[dataKey]));
  return Object.fromEntries(
    Array.from(uniqueBooks).map((bookName) => [
      bookName,
      {
        label: bookName,
        color:
          CHART_COLOR_PALETTE[
            Math.floor(Math.random() * CHART_COLOR_PALETTE.length)
          ],
      },
    ])
  );
};

export const getYAxisRange = (data: any[]) => {
  const maxExpense = Math.max(
    ...data.map((item) => {
      return Object.values(item).reduce(
        (sum: number, val) => sum + (typeof val === 'number' ? val : 0),
        0
      );
    })
  );
  return [0, maxExpense + (5000 - (maxExpense % 5000) + 5000)];
};

export const getUserInitials = (userProfile: any): string => {
  if (!userProfile) return '';
  const { firstName, lastName } = userProfile;
  return `${firstName?.charAt(0) || ''}${
    lastName?.charAt(0) || ''
  }`.toUpperCase();
};

export const groupExpensesByDate = (
  expenses: ExpenseWithDetails[] | []
): { date: string; expenses: ExpenseWithDetails[] }[] => {
  const grouped: Record<string, any[]> = {};

  for (const expense of expenses) {
    if (!grouped[expense.date]) {
      grouped[expense.date] = [];
    }
    grouped[expense.date].push(expense);
  }

  return Object.entries(grouped).map(([date, expenses]) => ({
    date,
    expenses,
  }));
};
