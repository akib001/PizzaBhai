import { createSlice } from '@reduxjs/toolkit';

const initialCartSlice = {
  showCart: false,
  showAuth: false,
  showEditForm: false,
  editFormData: {
    id: '',
    title: '',
    imageUrl: '',
    fileName: '',
    price: '',
    description: '',
    adminId: '', 
  },
  renderMealList: false,
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

    toggleshowEditFormHandler(state) {
      state.showEditForm = !state.showEditForm;
    },
    closeAllModal(state) {
        state.showCart = false;
        state.showAuth = false;
        state.showEditForm = false;
    },
    replaceEditFormData(state, action) {
      state.editFormData = action.payload
    },

    updateEditFormData(state, action) {
      state.editFormData = {
        ...state.editFormData,
        [action.payload.type]: action.payload.newData,
      };
    },

    toggleRenderMealList(state) {
      state.renderMealList = !state.renderMealList;
    }
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;