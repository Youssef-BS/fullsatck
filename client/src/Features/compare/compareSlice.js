import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  compareProducts: [],
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addProductToCompare: (state, action) => {
      // Check if the product already exists in the compare list
      if (!state.compareProducts.find(product => product.id === action.payload.id)) {
        if (state.compareProducts.length < 3) {
          state.compareProducts.push(action.payload);
          localStorage.setItem('compareProducts', JSON.stringify(state.compareProducts));
        }
      }
    },
    removeProductFromCompare: (state, action) => {
      state.compareProducts = state.compareProducts.filter(product => product.id !== action.payload);
      localStorage.setItem('compareProducts', JSON.stringify(state.compareProducts));
    },
    clearCompareProducts: (state) => {
      state.compareProducts = [];
      localStorage.removeItem('compareProducts');
    },
  },
});

export const { addProductToCompare, removeProductFromCompare, clearCompareProducts } = compareSlice.actions;
export default compareSlice.reducer;
