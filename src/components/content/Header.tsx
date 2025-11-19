import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CashbookLogo from '../../assets/cashbook_logo.png';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useAuthStore } from '@/store/authStore';

type HeaderProps = {
  userProfile?: any;
  logoutUser: () => void;
};

export default function Header({ logoutUser }: HeaderProps) {
  const userProfile = useAuthStore((state: any) => state.user);

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
                  <NavigationMenuLink
                    asChild
                    className='font-medium text-base text-neutral-500 hover:text-neutral-800'
                  >
                    <Link to='/'>Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className=''>
                  <NavigationMenuLink
                    asChild
                    className='font-medium text-base text-neutral-500 hover:text-neutral-800'
                  >
                    <Link to='/dashboard'>Dashboard</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className=''>
                  <NavigationMenuLink
                    asChild
                    className='font-medium text-base text-neutral-500 hover:text-neutral-800'
                  >
                    <Link to='/books'>Books</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className=''>
                  <NavigationMenuLink
                    asChild
                    className='font-medium text-base text-neutral-500 hover:text-neutral-800'
                  >
                    <Link to='/payment-modes'>Payment Modes</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className='col-span-1'>
          {userProfile ? (
            <div className='flex w-full h-full md:justify-end gap-3 items-center'>
              <span className='text-base font-medium text-neutral-900'>{`${userProfile.firstName} ${userProfile.lastName}`}</span>
              <Button
                variant='ghost'
                className='text-base font-medium text-neutral-500 hover:text-neutral-800 hover:cursor-pointer'
                onClick={logoutUser}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className='flex w-full h-full md:justify-end gap-3 items-center'>
              <Link
                to='/login'
                className='text-base font-medium text-neutral-500 hover:text-neutral-800'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='text-base font-medium text-neutral-500 hover:text-neutral-800'
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
