import { CountProducts } from '@/entities/countProducts';
import { usePostOrderMutation } from '@/shared/api/storeApi';
import { useAppDispatch, useAppSelector } from '@/shared/storage/hooks';
import { deleteProduct, setInitialState } from '@/shared/storage/productSlice';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const CartCard = () => {
  const stateOrder = useAppSelector((state) => state.product.order);
  const stateProductCart = useAppSelector((state) => state.product.product);
  const dispatch = useAppDispatch();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [postOrder, { isSuccess, isLoading: isUpdating }] =
    usePostOrderMutation();

  const postHandler = async () => {
    try {
      await postOrder(stateProductCart).unwrap();
      toast.success('Order successfully added!');
    } catch (error) {
      console.error('Failed to place order', error);
    }

    dispatch(setInitialState());
  };

  const productTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < stateProductCart.length; i++) {
      totalPrice +=
        stateProductCart[i].productPrice * stateProductCart[i].productQuantity;
    }
    return totalPrice.toFixed(2);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={'flex flex-row items-center justify-center'}>
      <Card className={'mt-4'}>
        <CardHeader>Your Cart!</CardHeader>
        <CardContent>
          {isClient || isUpdating ? (
            <>
              {stateProductCart.map((item) => (
                <div
                  key={item.productId}
                  className={'flex flex-row mb-4 min-w-96'}
                >
                  <div className={'mr-4'}>{/*Image*/}</div>
                  <div className={'flex flex-col flex-grow pr-4 min-w-96'}>
                    <div className={'flex flex-row mb-4'}>
                      <div className={'flex flex-col mr-16'}>
                        <div>{item.productName}</div>
                        <div>{item.productDescription}</div>
                      </div>
                      <Button
                        size={'icon'}
                        variant={'ghost'}
                        onClick={() =>
                          dispatch(deleteProduct({ productId: item.productId }))
                        }
                        className={'mb-auto ml-auto'}
                      >
                        <X />
                      </Button>
                    </div>
                    <div className={'mt-auto text-2xl flex flex-row'}>
                      {item.productPrice + '$'}
                      <CountProducts
                        productId={item.productId}
                        count={item.productQuantity}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div>Loading...</div>
          )}
        </CardContent>
        <CardFooter>
          {isClient ? (
            <div
              className={
                'flex flex-row justify-between items-center min-w-full'
              }
            >
              <div>Total Check: ${productTotalPrice()}</div>
              <div className={''}>
                {stateProductCart.length >= 1 && (
                  <Button onClick={postHandler}>Post Order!</Button>
                )}
                <Button onClick={() => dispatch(setInitialState())}></Button>
              </div>
            </div>
          ) : (
            <Skeleton className={'w-3.5'} />
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
