import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedUser } from './userAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
};


export const fetchLoggedUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedUser',
  async (userId) => {
    const response = await fetchLoggedUser(userId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;


export const selectCount = (state) => state.user.value;


export default userSlice.reducer;
