import { usePostOrderMutation } from '@/shared/api/storeApi';
import { useAppDispatch, useAppSelector } from '@/shared/storage/hooks';
import { setInitialState } from '@/shared/storage/productSlice';
import { Button } from '@/shared/ui/button';
import TrefoilSpinner from '@/shared/ui/trefoilSpinner';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const CartPostOrder = () => {
  const stateProductCart = useAppSelector(
    (state) => state.product.productLocal,
  );
  const [isClient, setIsClient] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [postOrder, { isSuccess, isLoading: isUpdating, status }] =
    usePostOrderMutation();

  const orderData = () => {
    const orderData: { products: { id: number; quantity: number }[] } = {
      products: [],
    };

    for (let i = 0; i < stateProductCart.length; i += 1) {
      orderData.products.push({
        id: stateProductCart[i].id,
        quantity: stateProductCart[i].quantity,
      });
    }
    console.log('orderData', orderData);
    return orderData;
  };

  const postHandler = async () => {
    try {
      await postOrder(orderData()).unwrap();
      toast.success(`Order successfully added!`);
      dispatch(setInitialState());
    } catch (error) {
      const err = error as { status: string; error: string };
      toast.error(`Failed to place order, error: ${err.status}`);
    }
  };

  const productTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < stateProductCart.length; i++) {
      totalPrice += stateProductCart[i].price * stateProductCart[i].quantity;
    }
    return totalPrice.toFixed(2);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={`min-w-full ${isUpdating ? 'flex justify-end' : ''}`}>
      {isClient ? (
        <>
          {stateProductCart.length === 0 ? null : (
            <>
              {isUpdating ? (
                <TrefoilSpinner
                  size={40}
                  speed={0.7}
                  stroke="white"
                  strokeLength={10}
                />
              ) : (
                <div className={'flex flex-row justify-between items-center'}>
                  <div>Total Check: ${productTotalPrice()}</div>
                  <div className={''}>
                    {stateProductCart.length >= 1 && (
                      <Button onClick={postHandler}>Post Order!</Button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : null}
    </div>
  );
};
