import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount, fetchLoggedUser } from './userAPI';

const initialState = {
  userInfo: null,
  status: 'idle',
};


export const fetchLoggedUserAsync = createAsyncThunk(
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
      .addCase(fetchLoggedUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;


export const selectCount = (state) => state.user.value;


export default userSlice.reducer;
