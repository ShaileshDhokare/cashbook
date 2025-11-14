import { Copyright } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='w-full border-t bg-muted/30 py-4 text-center text-sm text-muted-foreground'>
      <div className='flex items-center justify-center space-x-1'>
        <Copyright className='h-4 w-4' />
        <span>{year} Cashbook. All rights reserved.</span>
      </div>
      <div className='mt-1 text-xs text-muted-foreground'>
        Developed by{' '}
        <span className='font-medium text-foreground'>Shailesh Dhokare</span>
      </div>
    </footer>
  );
}
