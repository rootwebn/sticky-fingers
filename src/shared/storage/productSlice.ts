import { ProductCardInterface } from '@/shared/interfaces/productCard';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

const orderStatus = [
  'unconfirmed',
  'confirmed',
  'in process',
  'delivering',
  'delivered',
] as const;

export interface ProductState {
  order: {
    orderId: string;
    orderTimeCreated: string;
    orderStatus: (typeof orderStatus)[number];
    product: {
      productId: number;
      productName: string;
      productHref: string;
      productPrice: number;
      productQuantity: number;
      productDescription?: string;
    }[];
  };
  product: {
    productId: number;
    productName: string;
    productHref: string;
    productPrice: number;
    productQuantity: number;
    productDescription?: string;
  }[];
}

let cartFromLocalStorage: string | null = null;

if (typeof window !== 'undefined') {
  cartFromLocalStorage = localStorage.getItem('cart');
}

const storedCart = cartFromLocalStorage
  ? JSON.parse(cartFromLocalStorage).filter(
      (item: ProductCardInterface | null) => item !== null,
    )
  : [];

const initialState: ProductState = {
  order: {
    orderId: '',
    orderTimeCreated: '',
    orderStatus: 'unconfirmed',
    product: [],
  },
  product: storedCart,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setQuantity: (
      state,
      {
        payload: { isNegative, productId },
      }: PayloadAction<{ isNegative: boolean; productId: number }>,
    ) => {
      if (isNegative && state.product[productId].productQuantity > 1) {
        state.product[productId].productQuantity -= 1;
        localStorage.setItem('cart', JSON.stringify(state.product));
      } else if (!isNegative && state.product[productId].productQuantity < 5) {
        state.product[productId].productQuantity += 1;
        localStorage.setItem('cart', JSON.stringify(state.product));
      } else if (state.product[productId].productQuantity >= 5) {
        toast.error('you cant have more than 5 products');
      } else {
        toast.error('you cant have less than 1 products');
      }
    },
    setProduct: (
      state,
      {
        payload: { productData },
      }: PayloadAction<{ productData: ProductCardInterface }>,
    ) => {
      let isDuplicate = true;
      while (isDuplicate) {
        isDuplicate = false;
        for (let i = 0; i < state.product.length; i++) {
          if (
            productData &&
            state.product[i].productId === productData.productId
          ) {
            productData.productId += 1;
            isDuplicate = true;
            break;
          }
        }
      }

      state.product.push(productData);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.product));
      }

      toast.success(
        `Product added successfully. Data: ProductTime: ${state.product.length}`,
        { duration: 2000 },
      );
    },
    deleteProduct: (
      state,
      { payload: { productId } }: PayloadAction<{ productId: number }>,
    ) => {
      for (let i = 0; i < state.product.length; i++) {
        if (state.product[i].productId === productId) {
          state.product.splice(i, 1);
        }
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.product));
      }
    },
    setInitialState: (state) => {
      state.product = [];
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.product));
      }
    },
    setOrder: (
      state,
      {
        payload: { cartData },
      }: PayloadAction<{ cartData: ProductState['order'] }>,
    ) => {
      state.order = {
        ...cartData,
        product: state.product,
      };
    },
    //   setOrder: (
    //     state,
    //     action: PayloadAction<{ cartData: ProductState['order'] }>,
    //   ) => {
    //     state.order = action.payload.cartData;
    //   },
  },
  extraReducers: () => {},
});

export const {
  setOrder,
  setInitialState,
  setQuantity,
  setProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;
