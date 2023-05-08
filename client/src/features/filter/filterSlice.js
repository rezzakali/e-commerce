import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterWord: '',
  priceRange: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterWord: (state, action) => {
      state.filterWord = action.payload;
    },
    setPrice: (state, action) => {
      state.priceRange = action.payload;
    },
  },
});

export const { setFilterWord, setPrice } = filterSlice.actions;

export default filterSlice.reducer;
