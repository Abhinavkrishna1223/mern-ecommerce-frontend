import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProduct } from './productListApi';

const initialState = {
  value: 0,
  status: 'idle',
};


export const incrementAsync = createAsyncThunk(
  'product/fetchProduct',
  async (amount) => {
    const response = await fetchProduct(amount);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  
  reducers: {
    increment: (state) => {
    
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { increment } = productSlice.actions;




export default productSlice.reducer;
