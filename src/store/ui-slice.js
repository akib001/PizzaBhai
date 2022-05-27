import { createSlice } from '@reduxjs/toolkit';

const initialCartSlice = {
  showCart: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialCartSlice,
  reducers: {
    showCartHandler(state) {
      state.showCart = true;
    },
    hideCartHandler(state) {
      state.showCart = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;