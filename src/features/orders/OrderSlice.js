import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, getOrder } from './OrderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null,
};

export const getOrderAsync = createAsyncThunk(
  'order/getOrder',
  async () => {
    const response = await getOrder();
    return response.data;
  }
);


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
    resetCurrOrder:(state)=>{
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrderAsync.fulfilled, (state, action) => {
        state.status = 'orders-found';
        state.orders = action.payload;
      })
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'order-Created';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      });
  },
});

export const {resetCurrOrder} = orderSlice.actions;

export const selectOrders = (state)=> state.order.orders;


export default orderSlice.reducer;
