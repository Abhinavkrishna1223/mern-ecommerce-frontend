import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deletCartItem, fetchCartItems, updateTheCart } from './cartAPI';


const initialState = {
  items: [],
  status: 'idle',
};


export const fetchCartAsync = createAsyncThunk(
  'cart/fetchCartItems',
  async () => {
    const response = await fetchCartItems();
    return response.data;
  }
);

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (items) => {
    const response = await addToCart(items);
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
        return state;
      })
      .addCase(fetchCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item)=> item.id===action.payload.id)
        state.items[index] = action.payload
      })
      .addCase(deleteCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item)=> item.id===action.payload.id)
        console.log(index,'Index hai');
        state.items.splice(index,1)
      })
  },
});

export const { increment, decrement, incrementByAmount } = cartSlice.actions;


export default cartSlice.reducer;
