'use client';

import { useAppSelector } from '@/shared/storage/hooks';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface CartButtonProps {
  isMobile: boolean;
  className?: string;
}

export const CartButton = ({ isMobile, className }: CartButtonProps) => {
  const state = useAppSelector((state) => state.product.productLocal);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Button
      asChild
      variant={'outline'}
      className={`dark:bg-darkSpace bg-space text-white hover:text-lightSpace md:max-w-52 flex justify-normal items-center md:justify-start min-h-9 px-4 py-0 ${className}`}
    >
      <Link href={'/cart'} className={'flex flex-row gap-1.5 text-xl'}>
        <div>
          <ShoppingCart />
        </div>
        {!isMobile ? <>Cart</> : null}
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
  );
};
