import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    userDetails: {
      nom: '',
      prenom: '',
      criteres: '',
    },
    displayWelcome: true,
    currentListeName: '',
    selectedProduits: [],
    resultatsListe: {},
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
        resultatsListe: {},
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
    addListeResultat: (state, action) => {
      //state.value.resultatsListe = {...state.value.resultatsListe, action.payload}
    },
    updateListeResultat: (state, action) => {
      let tempData = { ...state.value.resultatsListe}
      state.value.resultatsListe = { ...Object.assign(tempData, action.payload) };
      /*state.value.resultatsListe =  state.value.resultatsListe.map((l) => {
        if (l.listeName === action.payload.listeName) {
          return action.payload
        } else {
          return l
        }
      })*/
    },
    removeListesResultat: (state, action) => {
      state.value.resultatsListe = state.value.resultatsListe((l) => l.listeName !== action.payload)
    },
    addProduit: (state, action) => {
      if (state.value.selectedProduits.some((p) => p.produit.nom === action.payload.nom)) {
        const produitCount = state.value.selectedProduits.find((p) => p.produit.nom === action.payload.nom).count;
        state.value.selectedProduits = state.value.selectedProduits.map((e) => {
          if (e.produit.nom === action.payload.nom) {
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
      const produitIndex = state.value.selectedProduits.findIndex((e) => e.produit.nom === action.payload.nom);
      if ( produitIndex !== -1) {
        const produitCount = state.value.selectedProduits.find((p) => p.produit.nom === action.payload.nom).count;
        if (produitCount - 1 === 0) {
        // last produit
          state.value.selectedProduits = state.value.selectedProduits.slice(0, produitIndex).concat(state.value.selectedProduits.slice(produitIndex+1));
        } else {
          state.value.selectedProduits = state.value.selectedProduits.map((e) => {
            if (e.produit.nom === action.payload.nom ) {
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
  addListeResultat,
  updateListeResultat,
  removeListesResultat,
} = userSlice.actions;

export default userSlice.reducer;
