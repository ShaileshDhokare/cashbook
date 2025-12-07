import { Button } from '@/components/ui/button';
import { ChartBar, CalendarCheck, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className='flex flex-col md:flex-row items-center justify-between px-6 py-16 max-w-6xl mx-auto'>
      <div className='flex-1 space-y-5'>
        <h1 className='text-4xl font-bold leading-tight text-gray-900'>
          Cashbook: Your <br /> Personal Expense Tracker
        </h1>
        <p className='text-gray-600 max-w-lg text-lg'>
          Effortlessly manage your finances, organize bills, and achieve your
          savings goals.
        </p>
        <Button size='lg' className='bg-blue-600 hover:bg-blue-700'>
          <Link to='/register'>Get Started</Link>
        </Button>
      </div>

      <div className='flex-1 mt-10 md:mt-0 flex justify-center'>
        <div className='bg-blue-50 p-6 rounded-2xl shadow-inner flex flex-col items-center'>
          <ChartBar className='w-16 h-16 text-green-600' />
          <div className='flex gap-4 mt-4'>
            <Coins className='w-10 h-10 text-green-500' />
            <CalendarCheck className='w-10 h-10 text-blue-500' />
          </div>
        </div>
      </div>
    </section>
  );
}
