'use client';

import { products } from '@/db';
import { SearchProductCard } from '@/entities/SearchProductCard';
import { ButtonComponentCart } from '@/entities/buttonComponent';
import { pages } from '@/shared/consts/variables';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/shared/ui/command';
import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

export const SearchComponent = () => {
  const [isOpen, setOpen] = React.useState(false);
  const pathname = usePathname();

  const pathnamePage = pages.some((p) => pathname.includes(p));

  useEffect(() => {
    for (let i = 0, l = products.length; i < l; i++) {
      if (pathname.includes(products[i].productHref) || pathnamePage) {
        setOpen(false);
      }
    }
  }, [pathname]);

  const SearchHandler = () => {
    if (!isOpen) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <ButtonComponentCart
        buttonText={'Search for goods...'}
        buttonIcon={<Search className={'min-w-6 min-h-6'} />}
        buttonTextClass={'text-sm font-light'}
        buttonClass={'px-2 py-2 min-w-96'}
        buttonOnClickFunction={SearchHandler}
      />
      <CommandDialog open={isOpen} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {products.map((item) => (
              <SearchProductCard
                key={item.productId}
                productId={item.productId}
                productDescription={item.productDescription}
                productName={item.productName}
                productHref={item.productHref}
                productPrice={item.productPrice}
                productQuantity={item.productQuantity}
              />
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
