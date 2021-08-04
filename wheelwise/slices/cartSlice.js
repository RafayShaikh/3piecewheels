import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addTocart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromcart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      let newcart = [...state.items];

      if (index >= 0) {
        newcart.splice(index, 1);
      } else {
        console.warn('Item is not in your cart !');
      }
      state.items = newcart;
    },
  },
});

export const { addTocart, removeFromcart } = cartSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.cart.items;

export const selectTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price, 0);

export default cartSlice.reducer;
