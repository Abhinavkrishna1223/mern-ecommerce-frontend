import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders, fetchLoggedUser, updateUser } from './userAPI'

const initialState = {
  userInfo:null,
  status: 'idle',
};


export const fetchLoggedUserInfoAsync = createAsyncThunk(
  'user/fetchLoggedUser',
  async () => {
    const response = await fetchLoggedUser();
    console.log(response.data);
    return response.data;
    
  }
);

export const fetchLoggedUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async () => {
    const response = await fetchLoggedInUserOrders();
    return response.data;
  }
);

export const userDetailsAsync = createAsyncThunk(
  'user/updateUser',
  async (updatedlogUser) => {
    const response = await updateUser(updatedlogUser);
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
      .addCase(fetchLoggedUserInfoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedUserInfoAsync.fulfilled, (state, action) => {
        state.status = 'user-found';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedUserInfoAsync.rejected, (state) => {
        state.status = 'user-Not-Found';
      })
      .addCase(fetchLoggedUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'order-found';
        state.userInfo.orders = action.payload;
      })
      .addCase(userDetailsAsync.pending, (state, action) => {
        state.status = 'idle'
      })
      .addCase(userDetailsAsync.fulfilled, (state, action) => {
        state.status = 'logUser-Updated';
        state.userInfo = action.payload;
      })
  },
});

export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;

export const { increment, decrement, incrementByAmount } = userSlice.actions;


export default userSlice.reducer;
