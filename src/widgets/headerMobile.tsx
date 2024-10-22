import { CartButton } from '@/entities/cartButton';
import { HeaderMenu } from '@/entities/headerMenu';
import { SearchComponent } from '@/entities/searchComponent';
import { ThemeSwitcher } from '@/entities/themeSwitcher';
import React from 'react';

export const HeaderMobile = () => {
  return (
    <div className="flex flex-row items-center justify-center text-xl md:hidden bg-space px-2 gap-2">
      <HeaderMenu />
      <SearchComponent />
      <CartButton isMobile={true} className={'px-2'} />
      <ThemeSwitcher />
    </div>
  );
};
