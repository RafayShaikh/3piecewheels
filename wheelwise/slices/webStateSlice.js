import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coverImages: [],
};

export const webStateSlice = createSlice({
  name: 'web',
  initialState,
  reducers: {
    loadImages: (state, action) => {
      state.coverImages = [...state.coverImages, action.payload];
    },
  },
});

export const { loadImages } = webStateSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectCoverImages = (state) => state.web.coverImages;
export const selectTotal = (state) =>
  state.web.coverImages.reduce((total) => total + 1, 0);
export const selectHome = (state) =>
  state.web.coverImages.filter((element) => element.name === 'home');
export const selectWheels = (state) =>
  state.web.coverImages.filter((element) => element.name === 'wheels');
export const selectApparel = (state) =>
  state.web.coverImages.filter((element) => element.name === 'apparel');
export const selectAccessories = (state) =>
  state.web.coverImages.filter((element) => element.name === 'accessories');
export const selectParts = (state) =>
  state.web.coverImages.filter((element) => element.name === 'parts');
export const selectGallery = (state) =>
  state.web.coverImages.filter((element) => element.name === 'gallery');

export default webStateSlice.reducer;
