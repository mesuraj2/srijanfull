import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload)
    }
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
} = cartSlice.actions;
