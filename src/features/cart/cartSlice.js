import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart } from './cartAPI';


const initialState = {
  items: [],
  status: 'idle',
};


export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (items) => {
    const response = await addToCart(items);
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
        console.log('here', action);
        state.items.push(action.payload);
        return state;
      });
  },
});

export const { increment, decrement, incrementByAmount } = cartSlice.actions;




export default cartSlice.reducer;
