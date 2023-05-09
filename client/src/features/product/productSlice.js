import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  paginateProductsLists: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setPaginateProductLists: (state, action) => {
      state.paginateProductsLists = action.payload;
    },
  },
});

export const { setProducts, setPaginateProductLists } = productSlice.actions;

export default productSlice.reducer;
