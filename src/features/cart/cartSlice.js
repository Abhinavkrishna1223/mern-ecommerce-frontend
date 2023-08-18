import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deletCartItem,  fetchCartItemsByUserId, resetCart, updateTheCart } from './cartAPI';


const initialState = {
  items: [],
  status: 'idle',
  cartLoaded:false,
};


export const fetchCartByUserIdAsync = createAsyncThunk(
  'cart/fetchCartItemsByUserId',
  async (id) => {
    const response = await fetchCartItemsByUserId(id);
    return response.data;
  }
);

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (cartItem) => {
    const response = await addToCart(cartItem);
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateTheCart',
  async (item) => {
    const response = await updateTheCart(item);
    return response.data;
  }
);

export const deleteCartAsync = createAsyncThunk(
  'cart/deletCartItem',
  async (itemId) => {
    const response = await deletCartItem(itemId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    return response.data;
  }
);


export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchCartByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload
        state.cartLoaded = true
      })
      .addCase(fetchCartByUserIdAsync.rejected, (state) => {
        state.status = 'Loading-Failed';
        state.cartLoaded = true
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        state.items[index] = action.payload
      })
      .addCase(deleteCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        console.log(index, 'Index hai');
        state.items.splice(index, 1)
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      })
  },
});

export const { increment, decrement, incrementByAmount } = cartSlice.actions;

export const selectCartLoaded = (state)=> state.cart.cartLoaded;


export default cartSlice.reducer;
