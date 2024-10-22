'use client';

import { PaginationSection } from '@/entities/paginationComponent';
import { ProductCard } from '@/entities/productCard';
import { useGetProductsPageQuery } from '@/shared/api/storeApi';
import { SideBar } from '@/widgets/sideBar/ui/sideBar';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';

const StorePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = searchParams.get('page');
  const pageParamUrl = currentPage ? parseInt(currentPage, 10) : 1;

  const [page, setPage] = useImmer(1);
  const [isUsed, setIsUsed] = useState(false);

  const { data } = useGetProductsPageQuery({
    page: page,
  });
  const products = data?.data.products ? data.data.products : [];

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
    setIsUsed(true);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    setIsUsed(true);
  };

  useEffect(() => {
    if (!isUsed) {
      if (pageParamUrl !== page) {
        setPage(pageParamUrl);
        router.push(`http://localhost:3000/store/?page=${pageParamUrl}`);
      }
    } else {
      router.push(`http://localhost:3000/store/?page=${page}`);
    }
  }, [isUsed, pageParamUrl, page]);

  console.log('page immer state', page);
  console.log('page param url', pageParamUrl);

  return (
    <div className={'flex flex-row'}>
      <SideBar />
      <div className={'flex flex-col flex-grow md:m-8'}>
        <div className={'grid grid-cols-1 md:grid-cols-4 gap-4'}>
          {products ? (
            <>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  href={product.href}
                  price={product.price}
                  quantity={1}
                  description={product.description}
                />
              ))}
            </>
          ) : (
            <div>No products available</div>
          )}
        </div>
        <div className={'mt-auto py-2  md:pt-8'}>
          {data ? (
            <PaginationSection
              page={page}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
            />
          ) : (
            <div>No products available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePage;
