import { CartItems } from '@/entities/cartItems';
import { CartPostOrder } from '@/entities/cartPostOrder';
import { usePostOrderMutation } from '@/shared/api/storeApi';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import TrefoilSpinner from '@/shared/ui/trefoilSpinner';

export const CartCard = () => {
  const [postOrder, { isSuccess, isLoading: isUpdating }] =
    usePostOrderMutation();

  return (
    <div className={'flex flex-row items-center justify-center'}>
      {isUpdating ? (
        <TrefoilSpinner size={40} speed={1} stroke="white" strokeLength={50} />
      ) : (
        <Card className={'mt-4'}>
          <CardHeader>Your Cart!</CardHeader>
          <CardContent>
            <CartItems />
          </CardContent>
          <CardFooter>
            <CartPostOrder />
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
