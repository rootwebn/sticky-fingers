import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authApi } from './authApi';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

// const BaseQueryReAuth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (
//   args, // This is the argument for the original query (endpoint URL, method, body, etc.)
//   api, // This is the RTK Query API object (contains dispatch, getState, etc.)
//   extraOptions, // Any additional options provided when the query is called
// ) => {
//   let result = await baseQuery(args, api, extraOptions);
//
//   // If the access token is expired, and you receive a 401 response
//   if (result.error && result.error.status === 500) {
//     // Try refreshing the token
//     const refreshToken = Cookies.get('refreshToken');
//     if (refreshToken) {
//       const refreshResult = await baseQuery(
//         {
//           url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/refreshToken`,
//           method: 'POST',
//           body: { refreshToken }, // assuming your backend accepts this format
//         },
//         api,
//         extraOptions,
//       );
//
//       if (refreshResult.data) {
//         // Store the new access token in cookies
//         const newAccessToken = (refreshResult.data as { accessToken: string })
//           .accessToken;
//         toast.message('you good with token');
//         Cookies.set('accessToken', newAccessToken, { expires: 1 });
//
//         // Retry the original query with the new token
//         result = await baseQuery(args, api, extraOptions);
//       } else {
//         // If refresh fails, handle the user being logged out
//         toast.message('Refresh token failed, logging out...');
//         Cookies.remove('accessToken');
//         Cookies.remove('refreshToken');
//         // Optionally, redirect to log in or handle logout
//       }
//     }
//   }
//
//   return result;
// };
//
// export default BaseQueryReAuth;

const BaseQueryReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let accessToken = Cookies.get('accessToken') || undefined;
  const refreshToken = Cookies.get('refreshToken');

  const tryRefreshToken = async (): Promise<string | null> => {
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`,
          method: 'POST',
          body: { refreshToken: refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const newAccessToken = (refreshResult.data as { accessToken: string })
          .accessToken;
        Cookies.set('accessToken', newAccessToken, { expires: 1 });
        return newAccessToken;
      } else {
        toast.message('Refresh token failed. Logging out...');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        return null;
      }
    }
    return null;
  };

  if (!accessToken && refreshToken) {
    const refreshedToken = await tryRefreshToken();
    if (refreshedToken) {
      accessToken = refreshedToken;
    }
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 500) {
    if (refreshToken) {
      const refreshedToken = await tryRefreshToken();
      if (refreshedToken) {
        accessToken = refreshedToken;
        result = await baseQuery(args, api, extraOptions);
      }
    } else {
      // No refreshToken available, log out
      toast.message('No refresh token available. Logging out...');
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    }
  }

  return result;
};

export default BaseQueryReAuth;
