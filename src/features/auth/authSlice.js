import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser, updateUser } from './authApi';


const initialState = {
  logUser: null,
  status: 'idle',
  error: null,
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (logUserData) => {
    const response = await createUser(logUserData);
    console.log(response.data,"Auth-Slice data");
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo, {rejectWithValue}) => { // {rejectWithValue} is a Thunk method to rejecting the request with error message passed in it
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error)
    }
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
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.logUser = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'signup-Failed';
        state.error = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.logUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'Login-Failed';
        state.error = action.payload;
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
