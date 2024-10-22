import { Product } from '@/shared/interfaces/Product';
import { ProductState } from '@/shared/storage/productSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface getProductsParams {
  page: number;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProductsPage: builder.query<
      ProductState['productPage'],
      getProductsParams
    >({
      query: ({ page }) => ({
        url: `/products/pagination?page=${page}`,
        method: 'GET',
      }),
    }),
    getProducts: builder.query<ProductState['productResponse'], void>({
      query: () => ({
        url: `/products/`,
        method: 'GET',
      }),
    }),
    getOrders: builder.query<ProductState['orderInfo'], void>({
      query: () => ({
        url: `/orders`,
        method: 'GET',
      }),
    }),
    postOrder: builder.mutation<ProductState['order'], ProductState['order']>({
      query: (newOrder) => ({
        url: `/orders`,
        method: 'POST',
        body: newOrder,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  usePostOrderMutation,
  useGetOrdersQuery,
  useGetProductsPageQuery,
} = userApi;
