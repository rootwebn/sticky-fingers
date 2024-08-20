import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import React from 'react';

const OrdersPage = () => {
  return (
    <div className={'flex flex-row items-center justify-center'}>
      <Card>
        <CardHeader>Orders Page</CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default OrdersPage;
