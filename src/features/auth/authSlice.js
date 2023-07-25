import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, getUser, loginUser, updateUser } from './authApi';


const initialState = {
  logUser: null,
  status: 'idle',
  error: null,
};

export const getUserAsync = createAsyncThunk(
  'user/getUser',
  async () => {
    const response = await getUser();
    return response.data;
  }
);

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (logUserData) => {
    const response = await createUser(logUserData);
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

export const userDetailsAsync = createAsyncThunk(
  'user/updateUser',
  async (updatedlogUser) => {
    const response = await updateUser(updatedlogUser);
    return response.data;
  }
);


export const logUserSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.logUser = action.payload;
      })
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.logUser = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.logUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(userDetailsAsync.pending, (state, action) => {
        state.status = 'idle'
      })
      .addCase(userDetailsAsync.fulfilled, (state, action) => {
        state.status = 'logUser-Updated';
        state.logUser = action.payload;
      })
  },
});

export const { increment, decrement, incrementByAmount } = logUserSlice.actions;



export default logUserSlice.reducer;
