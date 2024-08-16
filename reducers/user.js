import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    userDetails: {},
    displayWelcome: true,
    currentListeName: '',
    selectedProduits: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      state.value = {
        userDetails: {},
        displayWelcome: true,
        currentListeName: '',
        selectedProduits: [],
      };
    },
    updateUser: (state, action) => {
      let tempData = { ...state.value.userDetails }
      state.value.userDetails = { ...Object.assign(tempData, action.payload) };
    },
    updateWelcome: (state, action) => {
      state.value.displayWelcome = action.payload
    },
    updateListeName: (state, action) => {
      state.value.currentListeName = action.payload
    },
    addProduit: (state, action) => {
      if (state.value.selectedProduits.some((p) => p.produit._id === action.payload._id)) {
        const produitCount = state.value.selectedProduits.find((p) => p.produit._id === action.payload._id).count;
        state.value.selectedProduits = state.value.selectedProduits.map((e) => {
          if (e.produit._id === action.payload._id) {
            return { produit: e.produit, count: produitCount + 1}
          } else {
            return e
          }
        })
      } else {
        state.value.selectedProduits = [ 
          ...state.value.selectedProduits,
          { produit: action.payload, count: 1} ];
      }
    },
    removeProduit: (state, action) => {
      const produitIndex = state.value.selectedProduits.findIndex((e) => e.produit._id === action.payload._id);
      if ( produitIndex !== -1) {
        const produitCount = state.value.selectedProduits.find((p) => p.produit._id === action.payload._id).count;
        if (produitCount - 1 === 0) {
        // last produit
          state.value.selectedProduits = state.value.selectedProduits.slice(0, produitIndex).concat(state.value.selectedProduits.slice(produitIndex+1));
        } else {
          state.value.selectedProduits = state.value.selectedProduits.map((e) => {
            if (e.produit._id === action.payload._id) {
              return { produit: e.produit, count: produitCount - 1}
            } else {
              return e
            }
          })
        }
      }
    },
  },
});

export const { 
  logoutUser,
  updateUser, 
  updateWelcome, 
  updateListeName,
  addProduit,
  removeProduit, 
} = userSlice.actions;

export default userSlice.reducer;
