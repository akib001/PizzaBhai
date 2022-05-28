import { createSlice } from '@reduxjs/toolkit';

const initialCartSlice = {
  showCart: false,
  showAuth: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialCartSlice,
  reducers: {
    toggleShowCartHandler(state) {
      state.showCart = !state.showCart;
    },
    toggleShowAuthHandler(state) {
      state.showAuth = !state.showAuth;
    },
    closeAllModal(state) {
        state.showCart = false;
        state.showAuth = false;
    }
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;