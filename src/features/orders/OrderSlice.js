import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './OrderAPI';

const initialState = {
  orders:[],
  status: 'idle',
};


export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (orderItem) => {
    const response = await createOrder(orderItem);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'order-Created';
        state.orders.push(action.payload);
      });
  },
});

export const { increment, decrement, incrementByAmount } = orderSlice.actions;


export default orderSlice.reducer;
