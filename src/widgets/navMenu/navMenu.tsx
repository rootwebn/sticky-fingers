'use client';

import { ButtonComponent } from '@/entities/buttonComponent';
import { useAppSelector } from '@/shared/storage/hooks';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { Boxes, Clipboard, Headset, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export const NavMenu = () => {
  const state = useAppSelector((state) => state.product.product);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={`flex flex-row gap-3 pr-8 items-center`}>
      <ButtonComponent
        buttonText={'Store'}
        buttonIcon={<Boxes />}
        buttonHref={'/store'}
      />

      <Button
        asChild
        variant={'outline'}
        className={`dark:bg-darkSpace bg-space text-white hover:text-lightSpace max-w-52 flex items-center justify-start`}
      >
        <Link href={'/cart'} className={'flex flex-row gap-1.5 text-xl'}>
          <div>
            <ShoppingCart />
          </div>
          Cart
          {isClient ? (
            <>
              {state.length > 0 ? (
                <div
                  className={`ml-1 h-5 w-5 rounded-sm bg-midBlue text-sm flex items-center justify-center`}
                >
                  {state.length}
                </div>
              ) : null}
            </>
          ) : (
            <Skeleton className={'h-5 w-5'} />
          )}
        </Link>
      </Button>
      <ButtonComponent
        buttonText={'Orders'}
        buttonIcon={<Clipboard />}
        buttonHref={'/orders'}
      />
      <ButtonComponent
        buttonText={'Support'}
        buttonIcon={<Headset />}
        buttonHref={'/support'}
      />
    </div>
  );
};
