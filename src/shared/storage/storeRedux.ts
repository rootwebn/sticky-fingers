import { userApi } from '@/shared/api/storeApi';
import productReducer, { setOrder } from '@/shared/storage/productSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Middleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

// const orderMiddleware: Middleware = (storeAPI) => (next) => (action) => {
//   if (userApi.endpoints.postOrder.matchFulfilled(action)) {
//     storeAPI.dispatch(
//       setOrder({
//         cartData: { orderId: '', orderTimeCreated: '', product: [] },
//       }),
//     );
//   }
//   return next(action);
// };

export const makeStore = () => {
  return configureStore({
    reducer: {
      product: productReducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
