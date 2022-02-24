import { createSlice } from '@reduxjs/toolkit';

let initialUserToken = localStorage.getItem('userToken');
let initialAdminToken = localStorage.getItem('adminToken');

const initialState = {
  userToken: initialUserToken,
  adminToken: initialAdminToken,

  userLoggedIn: false,
  adminLoggedIn: false,

  error: '',
  totalOrderedQuantity: 0,
  totalOrderedPrice: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    isUserLoggedIn(state) {
      state.userLoggedIn = !!state.userToken;
    },

    isAdminLoggedIn(state) {
      state.adminLoggedIn = !!state.adminToken;
    },

    userLogin(state, action) {
      state.userToken = action.payload;
      localStorage.setItem('userToken', state.userToken);
    },

    adminLogin(state, action) {
      state.adminToken = action.payload;
      localStorage.setItem('adminToken', state.adminToken);
    },

    userLogout(state) {
      state.userToken = '';
      localStorage.removeItem('userToken');
      state.totalOrderedQuantity = 0;
      state.totalOrderedPrice = 0;
    },

    adminLogout(state) {
      state.adminToken = '';
      localStorage.removeItem('adminToken');
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
