import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
  total: number;
}

const initialState: ICart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    adToCart: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = state.products.find(
        (item) => item._id === action.payload._id
      );

      if (existingProduct) {
        existingProduct.quantity! += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },

    quantityMinus: (state, action: PayloadAction<IProduct>) => {
      const findProduct = state.products.find(
        (item) => item._id === action.payload._id
      );

      if (findProduct && findProduct.quantity! > 1) {
        findProduct.quantity = findProduct.quantity! - 1;
        state.total -= action.payload.price;
      }
    },

    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      const withoutThatCart = state.products.filter(
        (item) => item._id !== action.payload._id
      );
      state.products = withoutThatCart;
      state.total -= action.payload.price * action.payload.quantity!;
    },
  },
});

export const { adToCart, quantityMinus, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
