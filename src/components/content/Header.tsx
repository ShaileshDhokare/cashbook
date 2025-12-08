import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CashbookLogo from '../../assets/cashbook_logo.png';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useAuthStore } from '@/store/authStore';
import { Menu } from 'lucide-react';

type HeaderProps = {
  userProfile?: any;
  logoutUser: () => void;
};

export default function Header({ logoutUser }: HeaderProps) {
  const userProfile = useAuthStore((state: any) => state.user);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 w-full px-6 py-3 md:py-2 shadow-md bg-gray-100 border-b border-gray-200'>
      <div className='grid grid-cols-1 md:grid-cols-8 gap-2 md:gap-0'>
        <div className='md:col-span-2 xl:col-span-1'>
          <div className='flex'>
            <img
              src={CashbookLogo}
              alt='CashBook Logo'
              className='h-10 w-10 inline-block mr-2'
            />
            <h1 className='text-3xl font-bold text-gray-900'>
              <Link to='/'>CashBook</Link>
            </h1>
          </div>
        </div>
        <div className='md:col-span-6'>
          <div className='flex justify-between items-center'>
            {userProfile && (
              <NavigationMenu>
                <NavigationMenuList className='flex-wrap'>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className='font-medium bg-transparent text-base text-neutral-500 hover:text-neutral-800 cursor-pointer'>
                      <Menu className='w-5 h-5 mr-2' /> Menu
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className='mt-0'>
                      <ul className='grid w-[200px] gap-4'>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link to='/dashboard'>Dashboard</Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link to='/books'>Books</Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link to='/payment-modes'>Payment Modes</Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
            {userProfile ? (
              <div className='flex w-full h-full justify-end gap-3 items-center'>
                <span className='text-base font-medium text-neutral-900'>{`${userProfile.firstName}`}</span>
                <Button
                  variant='ghost'
                  className='text-base font-medium text-neutral-500 hover:text-neutral-800 hover:cursor-pointer'
                  onClick={logoutUser}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className='flex w-full h-full justify-end gap-3 items-center'>
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
      </div>
    </header>
  );
}
