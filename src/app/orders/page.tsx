'use client';

import { ButtonComponent } from '@/entities/buttonComponent';
import { useCheckTokenMutation } from '@/shared/api/authApi';
import { useGetOrdersQuery } from '@/shared/api/storeApi';
import AuthGuard from '@/shared/helpers/authGuard';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import TrefoilSpinner from '@/shared/ui/trefoilSpinner';
import Cookies from 'js-cookie';
import { Store } from 'lucide-react';
import React, { useEffect } from 'react';

const OrdersPage = () => {
  const { data, error, isLoading } = useGetOrdersQuery();
  const ordersInfo = data?.data ? data.data : [];

  const [token, { data: checkTokenData }] = useCheckTokenMutation();
  const accessToken = Cookies.get('accessToken')
    ? Cookies.get('accessToken')
    : '';

  useEffect(() => {
    token({ accessToken: accessToken });
    console.log('accessToken', checkTokenData?.statusCode);
  }, []);

  const CountTotalPrice = () => {
    if (data && ordersInfo.length !== 0) {
      let totalPriceNum = [];
      for (let i = 0; i < ordersInfo.length; i++) {
        let totalPriceOrder = 0;
        for (let j = 0; j < ordersInfo[i].orderProducts.length; j++) {
          totalPriceOrder +=
            ordersInfo[i].orderProducts[j].product.price *
            ordersInfo[i].orderProducts[j].quantity;
        }
        totalPriceNum.push(totalPriceOrder);
      }
      return totalPriceNum;
    } else {
      console.log('no data');
    }
  };

  console.log('data', data);

  const TotalPrice = CountTotalPrice();
  const totalPriceOrder = TotalPrice ? TotalPrice : [];

  return (
    <div className={'flex flex-row items-center justify-center'}>
      <Card>
        <CardHeader>Your Orders</CardHeader>
        <CardContent>
          {isLoading ? (
            <TrefoilSpinner
              size={40}
              speed={0.5}
              stroke="white"
              strokeLength={50}
            />
          ) : error || checkTokenData?.statusCode === 500 ? (
            <div>
              Seems like something&apos;s wrong. Reload the page and pray.
            </div>
          ) : !data ? (
            <div>
              Your cart is empty. Let&apos;s fix this in store!
              <ButtonComponent
                buttonText={'To Store!'}
                buttonIcon={<Store />}
                buttonHref={'/store'}
              />
            </div>
          ) : (
            <>
              {ordersInfo.map((item) => (
                <Card key={item.timeCreated}>
                  <CardHeader>
                    <div>Order Status: {item.status}</div>
                    <div>Time Created: {item.timeCreated}</div>
                    <div>
                      Total Price: {totalPriceOrder[ordersInfo.indexOf(item)]}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {item.orderProducts.map((item) => (
                      <Card key={item.product.id}>
                        <CardHeader>
                          <div>Name: {item.product.name}</div>
                          <div>Description: {item.product.description}</div>
                        </CardHeader>
                        <CardContent>
                          <div>Quantity: {item.quantity}</div>
                          <div>Price: {item.product.price}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default OrdersPage;
