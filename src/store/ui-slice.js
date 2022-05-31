import { createSlice } from '@reduxjs/toolkit';

const initialCartSlice = {
  showCart: false,
  showAuth: false,
  showAddFood: false
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

    toggleShowAddFoodHandler(state) {
      state.showAddFood = !state.showAddFood;
    },
    closeAllModal(state) {
        state.showCart = false;
        state.showAuth = false;
        state.showAddFood = false;
    }
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;