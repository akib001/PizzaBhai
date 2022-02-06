import { createSlice } from '@reduxjs/toolkit';

const initialCartSlice = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartSlice,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity= 0;
      state.totalAmount= 0;
    },

    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
        });
        state.totalAmount += newItem.price;
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
        state.totalAmount += existingItem.price;
      }
      state.totalQuantity++;
      state.changed = true;
      
    },

    removeFromCart(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);

      state.totalQuantity--;
      state.totalAmount = state.totalAmount - existingItem.price;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== itemId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;        
      }
    },

  },
});



export const cartActions = cartSlice.actions;
export default cartSlice;