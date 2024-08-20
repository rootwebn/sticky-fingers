import { SearchingInput } from '@/entities/searchingInput';
import { ThemeSwitcher } from '@/entities/themeSwitcher';
import { NavMenu } from '@/widgets/navMenu/navMenu';
import { Store } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div
      className={
        'flex flex-row bg-space text-xl tracking-wide border-altSpace border-b-2 sticky top-0 z-10'
      }
    >
      <div
        className={
          'min-h-16 max-w-72 flex flex-row justify-around items-center text-center text-white gap-16 border-r-2 border-altSpace pl-11'
        }
      >
        <div className={'flex flex-row gap-1.5 text-xl items-center'}>
          <Store className={'min-w-5/6 min-h-5/6'} />
          <Link href={'/'}>StarFlue</Link>
        </div>
        <div className={'mr-8'}>
          <ThemeSwitcher />
        </div>
      </div>
      <div
        className={'flex flex-row justify-between max-h-16 bg-space flex-grow'}
      >
        <SearchingInput />
        <NavMenu />
      </div>
    </div>
  );
};
export default Header;
