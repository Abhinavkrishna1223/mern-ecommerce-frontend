import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/productListSlice'
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/orders/OrderSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
