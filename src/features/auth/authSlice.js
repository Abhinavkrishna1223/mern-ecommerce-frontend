import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser } from './authApi';


const initialState = {
  user: null,
  status: 'idle',
  error:null,
};


export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo) => {
    const response = await loginUser(loginInfo);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;



export default userSlice.reducer;
