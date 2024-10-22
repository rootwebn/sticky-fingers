'use client';

import { ButtonComponent } from '@/entities/buttonComponent';
import { CountProducts } from '@/entities/countProducts';
import { usePostOrderMutation } from '@/shared/api/storeApi';
import { useAppDispatch, useAppSelector } from '@/shared/storage/hooks';
import { deleteProduct } from '@/shared/storage/productSlice';
import { Button } from '@/shared/ui/button';
import TrefoilSpinner from '@/shared/ui/trefoilSpinner';
import { BoxesIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export const CartItems = () => {
  const stateProductCart = useAppSelector(
    (state) => state.product.productLocal,
  );
  const dispatch = useAppDispatch();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [postOrder, { isSuccess, isLoading: isUpdating }] =
    usePostOrderMutation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient ? (
        <>
          {stateProductCart.length === 0 ? (
            <div>
              Cart is empty, you might wanna go to the{' '}
              <ButtonComponent
                buttonText={'Store'}
                buttonIcon={<BoxesIcon />}
                buttonHref={'/store'}
              />
            </div>
          ) : (
            <div>
              {stateProductCart.map((item) => (
                <div key={item.id} className={'flex flex-row mb-4 md:min-w-96'}>
                  <div className={'mr-4'}>{/*Image*/}</div>
                  <div className={'flex flex-col flex-grow pr-4 md:min-w-96'}>
                    <div className={'flex flex-row mb-4'}>
                      <div className={'flex flex-col md:mr-16'}>
                        <div>{item.name}</div>
                        <div>{item.description}</div>
                      </div>
                      <Button
                        size={'icon'}
                        variant={'ghost'}
                        onClick={() => dispatch(deleteProduct({ id: item.id }))}
                        className={'mb-auto ml-auto'}
                      >
                        <X />
                      </Button>
                    </div>
                    <div className={'mt-auto text-2xl flex flex-row'}>
                      {item.price + '$'}
                      <CountProducts id={item.id} count={item.quantity} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <TrefoilSpinner
          size={40}
          speed={0.5}
          stroke="white"
          strokeLength={50}
        />
      )}
    </div>
  );
};
