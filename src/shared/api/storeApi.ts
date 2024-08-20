import { ProductState } from '@/shared/storage/productSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductState['order'], void>({
      query: () => `/products`,
    }),
    postOrder: builder.mutation<
      ProductState['product'],
      ProductState['product']
    >({
      query: (newOrder) => ({
        url: `/products`,
        method: 'POST',
        body: newOrder,
      }),
      transformResponse: (res: ProductState['product']) => {
        return res;
      },
    }),
  }),
});

export const { useGetProductsQuery, usePostOrderMutation } = userApi;
