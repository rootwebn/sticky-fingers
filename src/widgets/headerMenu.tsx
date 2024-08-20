import { Button } from '@/shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { NavMenu } from '@/widgets/navMenu/navMenu';
import { Menu, Store } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const HeaderMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className={''}>
        <Button
          size={'icon'}
          className={'dark:bg-space bg-lightSpace text-white'}
        >
          <Menu className={'min-w-5/6 min-h-5/6'} />
        </Button>
      </SheetTrigger>
      <SheetContent className={'max-w-80'} side={'left'}>
        <SheetHeader className={'pb-2'}>
          <SheetTitle
            className={'flex flex-row gap-1.5 text-xl items-center pl-4'}
          >
            <Link href={'/'} className={''}>
              StarFlue
            </Link>
            <Store className={'min-w-5/6 min-h-5/6'} />
          </SheetTitle>
          <SheetDescription>
            A giraffe&apos;s heart is about 2 feet long.
          </SheetDescription>
        </SheetHeader>
        {/*<NavMenu isMobile={true} />*/}
      </SheetContent>
    </Sheet>
  );
};
