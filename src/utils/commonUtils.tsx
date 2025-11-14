import React from 'react';

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
