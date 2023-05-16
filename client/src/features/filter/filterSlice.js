import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterWord: '',
  priceRange: null,
  searchTerm: '',
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
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setFilterWord, setPrice, setSearchTerm } = filterSlice.actions;

export default filterSlice.reducer;
