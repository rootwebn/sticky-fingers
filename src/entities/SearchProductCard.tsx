'use client';

import { Product } from '@/shared/interfaces/Product';
import { useAppDispatch, useAppSelector } from '@/shared/storage/hooks';
import { CommandItem } from '@/shared/ui/command';
import Link from 'next/link';
import React from 'react';

export const SearchProductCard: React.FC<Product> = ({
  id,
  quantity,
  href,
  description,
  name,
  price,
}) => {
  const state = useAppSelector((state) => state.product.productLocal);
  const dispatch = useAppDispatch();

  const isProductInCart = (productId: number) => {
    return state.some((item) => item.id === productId);
  };

  // const productData = {
  //   productId: productId,
  //   productName: productName,
  //   productPrice: productPrice,
  //   productQuantity: productQuantity,
  //   productHref: productHref,
  //   productDescription: productDescription,
  // };

  return (
    <CommandItem key={id}>
      {/*<Image*/}
      {/*  src={productImages.productImageStore.productImageUrl}*/}
      {/*  alt={productImages.productImageStore.productImageAlt}*/}
      {/*  width={100}*/}
      {/*  height={100}*/}
      {/*/>*/}
      <div className={'ml-4 min-w-80'}>
        <Link
          href={`/store/${href}`}
          className={'hover:text-blue-400 text-white text-base'}
        >
          {name}
        </Link>
        <div className={'flex flex-row flex-grow gap-1.5'}>
          <div className={'mr-6 mt-auto text-xl text-white'}>{price + '$'}</div>
          {/*{isProductInCart(productId) ? (*/}
          {/*  <ButtonComponent*/}
          {/*    buttonText={'To Cart'}*/}
          {/*    buttonIcon={<ShoppingBasket />}*/}
          {/*    buttonHref={'/cart'}*/}
          {/*    buttonClass={'ml-auto'}*/}
          {/*  />*/}
          {/*) : (*/}
          {/*  <ButtonComponentCart*/}
          {/*    buttonText={'Add To Cart'}*/}
          {/*    buttonIcon={<ShoppingBasket />}*/}
          {/*    buttonOnClickFunction={() =>*/}
          {/*      dispatch(setProduct({ productData }))*/}
          {/*    }*/}
          {/*    buttonClass={'ml-auto text-base'}*/}
          {/*  />*/}
          {/*)}*/}
        </div>
      </div>
    </CommandItem>
  );
};
