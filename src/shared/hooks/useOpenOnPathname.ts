import { useGetProductsQuery } from '@/shared/api/storeApi';
import { pages } from '@/shared/consts/variables';
import { Product } from '@/shared/interfaces/Product';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UseOpenOnPathnameProps {
  pages: typeof pages;
  products: Product[];
}

export const useOpenOnPathname = () => {
  const [isOpen, setOpen] = useState(false);
  const { data, isLoading, error } = useGetProductsQuery();

  const pathname = usePathname();
  const products = data?.data ? data.data : [];

  const pathnamePage = pages.some((p) => pathname.includes(p));

  useEffect(() => {
    for (let i = 0, l = products.length; i < l; i++) {
      if (pathname.includes(products[i].href) || pathnamePage) {
        setOpen(false);
      }
    }
  }, [pathname, products, pathnamePage]);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return { isOpen, toggleOpen, setOpen };
};
