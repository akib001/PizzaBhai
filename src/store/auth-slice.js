import { createSlice } from '@reduxjs/toolkit';

let initialToken = localStorage.getItem('token');

const initialState = {
  token: initialToken,
  isLoggedIn: false,
  error: '',
  totalOrderedQuantity: 0,
  totalOrderedPrice: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    isUserLoggedIn(state) {
      state.isLoggedIn = !!state.token;
    },

    login(state, action) {
      state.token = action.payload;
      localStorage.setItem('token', state.token);
    },

    logout(state) {
      state.token = '';
      localStorage.removeItem('token');
      state.totalOrderedQuantity = 0;
      state.totalOrderedPrice = 0;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    calculateOrderSummary(state, action) {
      state.totalOrderedQuantity += action.payload.totalQuantity;
      state.totalOrderedPrice += action.payload.totalPrice;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
