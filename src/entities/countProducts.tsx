'use client';

import { useAppDispatch, useAppSelector } from '@/shared/storage/hooks';
import { setQuantity } from '@/shared/storage/productSlice';
import { Button } from '@/shared/ui/button';
import React from 'react';

interface CountProductsProps {
  productId: number;
  count: number;
}

export const CountProducts: React.FC<CountProductsProps> = ({
  productId,
  count,
}) => {
  const productState = useAppSelector((state) => state.product.product);
  const dispatch = useAppDispatch();

  return (
    <div className={'ml-auto flex flex-row'}>
      <Button
        onClick={() =>
          dispatch(
            setQuantity({
              isNegative: true,
              productId: productState.findIndex(
                (product) => product.productId === productId,
              ),
            }),
          )
        }
      >
        -
      </Button>
      <div className={'px-4'}>{count}</div>
      <Button
        onClick={() =>
          dispatch(
            setQuantity({
              isNegative: false,
              productId: productState.findIndex(
                (product) => product.productId === productId,
              ),
            }),
          )
        }
      >
        +
      </Button>
    </div>
  );
};
