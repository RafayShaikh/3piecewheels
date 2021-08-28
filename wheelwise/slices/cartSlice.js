import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  bolt: null,
  diameter: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    loadBolt: (state, action) => {
      state.bolt = action.payload;
    },
    loadDiameter: (state, action) => {
      state.diameter = action.payload;
    },
    clearCartItems: (state) => {
      state.items = [];
    },
  },
});

export const { loadCart, clearCartItems, loadBolt, loadDiameter } =
  cartSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectBolt = (state) => state.cart.bolt;
export const selectDiameter = (state) => state.cart.diameter;
export const selectTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => total + item.price, 0);

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total) => total + 1, 0);

export default cartSlice.reducer;
