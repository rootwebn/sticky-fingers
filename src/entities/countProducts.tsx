'use client';

import { useAppDispatch, useAppSelector } from '@/shared/storage/hooks';
import { setQuantity } from '@/shared/storage/productSlice';
import { Button } from '@/shared/ui/button';
import React from 'react';

interface CountProductsProps {
  id: number;
  count: number;
}

export const CountProducts: React.FC<CountProductsProps> = ({ id, count }) => {
  const productState = useAppSelector((state) => state.product.productLocal);
  const dispatch = useAppDispatch();

  return (
    <div className={'ml-auto flex flex-row'}>
      <Button
        onClick={() =>
          dispatch(
            setQuantity({
              isNegative: true,
              id: productState.findIndex((product) => product.id === id),
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
              id: productState.findIndex((product) => product.id === id),
            }),
          )
        }
      >
        +
      </Button>
    </div>
  );
};
