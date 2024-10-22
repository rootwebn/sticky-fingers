'use client';

import { useGetProductsQuery } from '@/shared/api/storeApi';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading, error } = useGetProductsQuery();
  const products = data?.data ? data.data : [];

  const router = useRouter();
  const product = products.find((p) => p.href === params.id);

  if (!product) {
    router.push('/404');
    return null;
  }

  return (
    <div>
      <div>
        {/*<Image*/}
        {/*  src={product.productImages.productImagePage.productImageUrl}*/}
        {/*  alt={product.productImages.productImagePage.productImageAlt}*/}
        {/*  width={product.productImages.productImagePage.productImageWidth}*/}
        {/*  height={product.productImages.productImagePage.productImageHeight}*/}
        {/*/>*/}
      </div>
      <div>{product.name}</div>
    </div>
  );
}
