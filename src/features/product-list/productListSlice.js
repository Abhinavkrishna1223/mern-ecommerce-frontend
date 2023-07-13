import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllBrands, fetchAllCategories, fetchAllProduct, fetchProductsByFilter } from './productListApi';

const initialState = {
  products: [],
  brands:[],
  categories:[],
  status: 'idle',
  totalItems:0,
};


export const fetchAllProductAsync = createAsyncThunk(
  'products/fetchAllProduct',
  async () => {
    const response = await fetchAllProduct();
    return response.data;
  }
);

//For filtering the Items
export const fetchProductsByFilterAsync = createAsyncThunk(
  'products/fetchProductsByFilter',
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilter({filter,sort, pagination});
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  'products/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  'products/fetchAllCategories',
  async () => {
    const response = await fetchAllCategories();
    return response.data;
  }
);





export const productSlice = createSlice({
  name: 'products',
  initialState,
  
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchAllProductAsync.rejected, (state, action) => {
        state.status = 'Rejected';
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
  },
});

export const { increment } = productSlice.actions;




export default productSlice.reducer;
