import BaseQueryReAuth from '@/shared/api/BaseQueryReAuth';
import { createApi } from '@reduxjs/toolkit/query/react';

interface loginCredentials {
  email: string;
  password: string;
}

interface loginCredentialsResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string;
    };
  };
  status: boolean;
  statusCode: number;
  path: string;
  timestamp: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: BaseQueryReAuth,
  endpoints: (builder) => ({
    login: builder.mutation<loginCredentialsResponse, loginCredentials>({
      query: ({ email, password }) => ({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        method: 'POST',
        body: { email, password },
      }),
    }),
    checkToken: builder.mutation({
      query: ({ accessToken }) => ({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/access-token`,
        method: 'POST',
        body: accessToken,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useCheckTokenMutation } =
  authApi;
