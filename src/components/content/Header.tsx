import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CashbookLogo from '../../assets/cashbook_logo.png';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

type HeaderProps = {
  displayLogin?: boolean;
};

export default function Header({ displayLogin = true }: HeaderProps) {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 shadow-md bg-gray-100 border-b border-gray-200'>
      <div className='grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-0'>
        <div className='col-span-1'>
          <div className='flex'>
            <img
              src={CashbookLogo}
              alt='CashBook Logo'
              className='h-10 w-10 inline-block mr-2'
            />
            <h1 className='text-3xl font-bold text-gray-900'>CashBook</h1>
          </div>
        </div>
        <div className='col-span-4'>
          <div>
            <NavigationMenu>
              <NavigationMenuList className='flex-wrap'>
                <NavigationMenuItem className=''>
                  <NavigationMenuLink asChild className='font-medium text-base'>
                    <Link to='/'>Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className=''>
                  <NavigationMenuLink asChild className='font-medium text-base'>
                    <Link to='/dashboard'>Dashboard</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className=''>
                  <NavigationMenuLink asChild className='font-medium text-base'>
                    <Link to='/books'>Books</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className=''>
                  <NavigationMenuLink asChild className='font-medium text-base'>
                    <Link to='/payment-modes'>Payment Modes</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className='col-span-1'>
          {displayLogin && (
            <div className='flex w-full md:justify-end gap-3'>
              <Link to='/login'>
                <Button variant='default'>Login</Button>
              </Link>
              <Link to='/register'>
                <Button variant='outline'>Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
