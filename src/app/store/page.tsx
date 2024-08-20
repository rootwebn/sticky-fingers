'use client';

import { products } from '@/db';
import { PaginationSection } from '@/entities/paginationComponent';
import { ProductCard } from '@/entities/productCard';
import { SideBar } from '@/widgets/sideBar/ui/sideBar';
import React, { useEffect, useState } from 'react';

const StorePage = () => {
  const rowsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(rowsPerPage);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  return (
    <div className={'flex flex-row'}>
      <SideBar />
      <div className={'flex flex-col flex-grow m-8'}>
        <div className={'grid grid-cols-4 gap-4'}>
          {products.slice(firstPostIndex, lastPostIndex).map((product) => (
            <ProductCard
              key={product.productId}
              productId={product.productId}
              productName={product.productName}
              productHref={product.productHref}
              productPrice={product.productPrice}
              productQuantity={product.productQuantity}
              productDescription={product.productDescription}
            />
          ))}
        </div>
        <div className={'mt-auto pt-8'}>
          <PaginationSection
            totalPosts={products.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default StorePage;
