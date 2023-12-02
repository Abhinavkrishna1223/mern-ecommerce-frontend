import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllBrands, fetchAllCategories, fetchProductById, fetchProductsByFilter } from './productListApi';

const initialState = {
  products: [],
  brands:[],
  categories:[],
  status: 'idle',
  totalItems:0,
  selectedProduct:null
};


export const fetchProductByIdAsync = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);


//For filtering the Items
export const fetchProductsByFilterAsync = createAsyncThunk(
  'products/fetchProductsByFilter',
  async ({filter,sort,pagination, searchtitle}) => {
    const response = await fetchProductsByFilter({filter,sort, pagination, searchtitle});
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
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading-Id';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
  },
});

export const { increment } = productSlice.actions;




export default productSlice.reducer;
