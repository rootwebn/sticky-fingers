'use client';

import {
  ButtonComponent,
  ButtonComponentCart,
} from '@/entities/buttonComponent';
import { Product } from '@/shared/interfaces/Product';
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

export const ProductCard: React.FC<Product> = ({
  id,
  name,
  href,
  price,
  quantity,
  description,
}) => {
  const state = useAppSelector((state) => state.product.productLocal);
  const dispatch = useAppDispatch();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const productData = {
    id: id,
    name: name,
    price: price,
    quantity: quantity,
    href: href,
    description: description,
  };

  const isProductInCart = (productId: number) => {
    return state.some((item) => item.id === productId);
  };

  return (
    <Card className={'md:max-w-[280px] h-full flex flex-col'}>
      <CardHeader className={'text-xl'}>
        <CardTitle>
          <Link href={`/store/${href}`} className={'hover:text-blue-400'}>
            {name}
          </Link>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
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
        <div className={''}>{price + '$'}</div>
        {isClient ? (
          <>
            {isProductInCart(id) ? (
              <ButtonComponent
                buttonText={'To Cart'}
                buttonIcon={<ShoppingBasket />}
                buttonHref={'/cart'}
              />
            ) : (
              <ButtonComponentCart
                buttonText={'Add To Cart'}
                buttonIcon={<ShoppingBasket />}
                buttonClass={'text-xl cursor-pointer'}
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
