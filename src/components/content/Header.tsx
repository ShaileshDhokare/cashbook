import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CashbookLogo from '../../assets/cashbook_logo.png';

type HeaderProps = {
  displayLogin?: boolean;
};

export function Header({ displayLogin = false }: HeaderProps) {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-6 py-4 shadow-md bg-gray-100 border-b border-gray-200'>
      <div className='flex'>
        <img
          src={CashbookLogo}
          alt='CashBook Logo'
          className='h-10 w-10 inline-block mr-2'
        />
        <h1 className='text-3xl font-bold text-gray-900'>CashBook</h1>
      </div>
      {displayLogin && (
        <div className='flex gap-3'>
          <Link to='/login'>
            <Button variant='default'>Login</Button>
          </Link>
          <Link to='/register'>
            <Button variant='outline'>Register</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
