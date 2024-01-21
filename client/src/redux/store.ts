import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import productReducer from './features/product/productSlice';
import { api } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
