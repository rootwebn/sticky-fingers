'use client';

import {
  ButtonComponent,
  ButtonComponentCart,
} from '@/entities/buttonComponent';
import { ProductCardInterface } from '@/shared/interfaces/productCard';
import { useAppDispatch, useAppSelector } from '@/shared/storage/hooks';
import { setProduct } from '@/shared/storage/productSlice';
import { CommandItem } from '@/shared/ui/command';
import { ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const SearchProductCard: React.FC<ProductCardInterface> = ({
  productId,
  productQuantity,
  productHref,
  productDescription,
  productName,
  productPrice,
}) => {
  const state = useAppSelector((state) => state.product.product);
  const dispatch = useAppDispatch();

  const isProductInCart = (productId: number) => {
    return state.some((item) => item.productId === productId);
  };

  const productData = {
    productId: productId,
    productName: productName,
    productPrice: productPrice,
    productQuantity: productQuantity,
    productHref: productHref,
    productDescription: productDescription,
  };

  return (
    <CommandItem key={productId}>
      {/*<Image*/}
      {/*  src={productImages.productImageStore.productImageUrl}*/}
      {/*  alt={productImages.productImageStore.productImageAlt}*/}
      {/*  width={100}*/}
      {/*  height={100}*/}
      {/*/>*/}
      <div className={'ml-4 min-w-80'}>
        <Link
          href={`/store/${productHref}`}
          className={'hover:text-blue-400 text-white text-base'}
        >
          {productName}
        </Link>
        <div className={'flex flex-row flex-grow gap-1.5'}>
          <div className={'mr-6 mt-auto text-xl text-white'}>
            {productPrice + '$'}
          </div>
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
