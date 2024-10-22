'use client';

import { SearchProductCard } from '@/entities/SearchProductCard';
import { ButtonComponentCart } from '@/entities/buttonComponent';
import { useGetProductsQuery } from '@/shared/api/storeApi';
import { useOpenOnPathname } from '@/shared/hooks/useOpenOnPathname';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/shared/ui/command';
import { Search } from 'lucide-react';
import React from 'react';

export const SearchComponent = () => {
  const { setOpen, isOpen, toggleOpen } = useOpenOnPathname();
  const { data, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <ButtonComponentCart
        buttonText={'Search for goods...'}
        buttonIcon={<Search className={'min-w-6 min-h-6'} />}
        buttonTextClass={'text-sm font-light'}
        buttonClass={'px-2 py-2 md:min-w-96 flex-grow'}
        buttonOnClickFunction={toggleOpen}
      />
      <CommandDialog open={isOpen} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {data ? (
              <>
                {data.data.map((item) => (
                  <SearchProductCard
                    key={item.id}
                    id={item.id}
                    description={item.description}
                    name={item.name}
                    href={item.href}
                    price={item.price}
                    quantity={item.quantity}
                  />
                ))}
              </>
            ) : (
              <div>no bitches?</div>
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
