import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  email: null,
  uid: null,
};

export const personStateSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
    signedOut: (state, action) => {
      state.name = null;
      state.email = null;
      state.uid = null;
    },
  },
});

export const { loggedIn, signedOut } = personStateSlice.actions;

export const selectPerson = (state) => state.person;

export default personStateSlice.reducer;
