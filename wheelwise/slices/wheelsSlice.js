import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const wheelsSlice = createSlice({
  name: 'wheels',
  initialState,
  reducers: {
    loadWheels: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    clearWheels: (state) => {
      state.items = [];
    },
  },
});

export const { loadWheels, clearWheels } = wheelsSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.wheels.items;
export const selectLength = (state) =>
  state.wheels.items.reduce((total) => total + 1, 0);

export default wheelsSlice.reducer;
