'use client';

import {
  ButtonComponent,
  ButtonComponentCart,
} from '@/entities/buttonComponent';
import { ProductCardInterface } from '@/shared/interfaces/productCard';
import { useAppDispatch, useAppSelector } from '@/shared/storage/hooks';
import { setProduct } from '@/shared/storage/productSlice';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export const ProductCard: React.FC<ProductCardInterface> = ({
  productId,
  productName,
  productHref,
  productPrice,
  productQuantity,
  productDescription,
}) => {
  const state = useAppSelector((state) => state.product.product);
  const dispatch = useAppDispatch();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const productData = {
    productId: productId,
    productName: productName,
    productPrice: productPrice,
    productQuantity: productQuantity,
    productHref: productHref,
    productDescription: productDescription,
  };

  const isProductInCart = (productId: number) => {
    return state.some((item) => item.productId === productId);
  };

  return (
    <Card className={'max-w-[280px] h-full flex flex-col'}>
      <CardHeader className={'text-xl'}>
        <CardTitle>
          <Link
            href={`/store/${productHref}`}
            className={'hover:text-blue-400'}
          >
            {productName}
          </Link>
        </CardTitle>
        <CardDescription>{productDescription}</CardDescription>
      </CardHeader>
      <CardContent className={'flex-grow flex flex-col justify-around'}>
        {/*<Image*/}
        {/*  src={productImages.productImageStore.productImageUrl}*/}
        {/*  alt={productImages.productImageStore.productImageAlt}*/}
        {/*  width={productImages.productImageStore.productImageWidth}*/}
        {/*  height={productImages.productImageStore.productImageHeight}*/}
        {/*/>*/}
      </CardContent>
      <CardFooter
        className={'mt-auto flex flex-row justify-between items-center'}
      >
        <div className={''}>{productPrice + '$'}</div>
        {isClient ? (
          <>
            {isProductInCart(productId) ? (
              <ButtonComponent
                buttonText={'To Cart'}
                buttonIcon={<ShoppingBasket />}
                buttonHref={'/cart'}
              />
            ) : (
              <ButtonComponentCart
                buttonText={'Add To Cart'}
                buttonIcon={<ShoppingBasket />}
                buttonClass={'text-xl'}
                buttonOnClickFunction={() =>
                  dispatch(setProduct({ productData }))
                }
              />
            )}
          </>
        ) : (
          <Skeleton className={'w-32 h-10'} />
        )}
      </CardFooter>
    </Card>
  );
};
