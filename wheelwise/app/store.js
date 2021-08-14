import { configureStore } from '@reduxjs/toolkit';
import personState from '../slices/personStateSlice';
import webState from '../slices/webStateSlice';

export const store = configureStore({
  reducer: {
    person: personState,
    web: webState,
  },
});
