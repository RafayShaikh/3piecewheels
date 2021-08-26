import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../slices/cartSlice';
import personState from '../slices/personStateSlice';
import webState from '../slices/webStateSlice';
import wheelsSlice from '../slices/wheelsSlice';

export const store = configureStore({
  reducer: {
    person: personState,
    web: webState,
    wheels: wheelsSlice,
    cart: cartSlice,
  },
});
