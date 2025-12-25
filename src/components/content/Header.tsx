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
import { Menu, CircleUserRound } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getUserInitials } from '@/utils/commonUtils';

type HeaderProps = {
  userProfile?: any;
  logoutUser: () => void;
};

export default function Header({ logoutUser }: HeaderProps) {
  const userProfile = useAuthStore((state: any) => state.user);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 w-full px-4 py-2 shadow-md bg-gray-100 border-b border-gray-200'>
      <div className='flex justify-between items-center gap-4 h-full w-full'>
        <div className='flex'>
          <img
            src={CashbookLogo}
            alt='CashBook Logo'
            className='h-10 w-10 inline-block mr-2'
          />
          <h1 className='text-3xl font-semibold text-gray-900'>
            <Link to='/'>CashBook</Link>
          </h1>
        </div>
        <div className='flex justify-end items-center w-full gap-2'>
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
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className='border-2 border-neutral-500 cursor-pointer hover:border-neutral-800'>
                    <AvatarFallback className='font-semibold text-neutral-500 hover:text-neutral-800'>
                      {getUserInitials(userProfile)}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className='w-fit'>
                  <div className='p-3 flex flex-col gap-1 justify-center items-center'>
                    <CircleUserRound className='w-15 h-15' />
                    <span className='text-xl font-medium text-neutral-900'>{`${userProfile.firstName} ${userProfile.lastName}`}</span>
                    <p className='text-md'>{userProfile.email}</p>
                    <Button
                      variant='secondary'
                      size='sm'
                      className='cursor-pointer hover:bg-gray-200 mt-3'
                      onClick={logoutUser}
                    >
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <div>
              <Button
                variant='outline'
                className='hover:cursor-pointer rounded-4xl p-3'
              >
                <Link to='/login' className='flex items-center gap-2'>
                  <CircleUserRound className='w-10 h-10 text-neutral-500' />
                  Login
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
