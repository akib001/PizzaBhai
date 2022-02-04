import { createSlice } from '@reduxjs/toolkit';

let initialToken = localStorage.getItem('token');

const initialState = {
  token: initialToken,
  isLoggedIn: false,
  error: '',
  totalOrderedPrice: 0,
  totalOrderedAmount: 0
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
        state.totalOrderedPrice= 0;
        state.totalOrderedAmount= 0;
    },

    setError(state, action) {
        state.error = action.payload;
    },

    calculateTotalOrders(state, action) {
      state.totalOrderedPrice += action.payload;
    },

    calculateTotalOrderedAmount(state, action) {
      state.totalOrderedAmount += action.payload;
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice;
