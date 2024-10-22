import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { number } from 'zod';

const orderStatus = [
  'pending',
  'confirmed',
  'canceled',
  'shipped',
  'delivered',
] as const;

interface Product {
  id: number;
  name: string;
  href: string;
  price: number;
  quantity: number;
  description: string;
}

export interface ProductState {
  order: {
    products: {
      id: number;
    }[];
  };
  orderInfo: {
    data: {
      timeCreated: string;
      status: (typeof orderStatus)[number];
      orderProducts: {
        quantity: number;
        product: {
          id: number;
          name: string;
          price: number;
          description: string;
        };
      }[];
    }[];
  };
  productResponse: {
    data: {
      id: number;
      name: string;
      href: string;
      price: number;
      quantity: number;
      description: string;
    }[];
  };
  productLocal: {
    id: number;
    name: string;
    href: string;
    price: number;
    quantity: number;
    description: string;
  }[];
  productPage: {
    data: {
      products: {
        id: number;
        name: string;
        href: string;
        price: number;
        quantity: number;
        description: string;
      }[];
      total: number;
      page: string;
      limit: number;
      totalPages: number;
    };
  };
}

let cartFromLocalStorage: string | null = null;

if (typeof window !== 'undefined') {
  cartFromLocalStorage = localStorage.getItem('cart');
}

const storedCart = cartFromLocalStorage
  ? JSON.parse(cartFromLocalStorage).filter(
      (item: Product | null) => item !== null,
    )
  : [];

const initialState: ProductState = {
  order: {
    products: [],
  },
  orderInfo: {
    data: [],
  },
  productPage: {
    data: {
      products: [],
      total: 0,
      page: '',
      limit: 16,
      totalPages: 0,
    },
  },
  productResponse: {
    data: [],
  },
  productLocal: storedCart,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setQuantity: (
      state,
      {
        payload: { isNegative, id },
      }: PayloadAction<{ isNegative: boolean; id: number }>,
    ) => {
      if (isNegative && state.productLocal[id].quantity > 1) {
        state.productLocal[id].quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(state.productLocal));
      } else if (!isNegative && state.productLocal[id].quantity < 5) {
        state.productLocal[id].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(state.productLocal));
      } else if (state.productLocal[id].quantity >= 5) {
        toast.error('you cant have more than 5 products');
      } else {
        toast.error('you cant have less than 1 products');
      }
    },
    setProduct: (
      state,
      { payload: { productData } }: PayloadAction<{ productData: Product }>,
    ) => {
      let isDuplicate = true;
      while (isDuplicate) {
        isDuplicate = false;
        for (let i = 0; i < state.productLocal.length; i++) {
          if (productData && state.productLocal[i].id === productData.id) {
            productData.id += 1;
            isDuplicate = true;
            break;
          }
        }
      }

      state.productLocal.push(productData);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.productLocal));
      }

      toast.success(`Product added successfully.`, { duration: 2000 });
    },
    deleteProduct: (
      state,
      { payload: { id } }: PayloadAction<{ id: number }>,
    ) => {
      for (let i = 0; i < state.productLocal.length; i++) {
        if (state.productLocal[i].id === id) {
          state.productLocal.splice(i, 1);
        }
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.productLocal));
      }
    },
    setInitialState: (state) => {
      state.productLocal = [];
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.productLocal));
      }
    },
  },
  extraReducers: () => {},
});

export const { setInitialState, setQuantity, setProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
