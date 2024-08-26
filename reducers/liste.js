import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    listeName: '',
    liste: {},
    selectedListe: {},
  },
};

export const listeSlice = createSlice({
  name: 'liste',
  initialState,
  reducers: {
    updateListeName: (state, action) => {
      state.value.listeName = action.payload
    },
    addListe: (state, action) => {
      state.value.liste = {
        ...state.value.liste,
        ...action.payload
      }
    },
    updateListe: (state, action) => {
      let tempData = { ...state.value.liste}
      state.value.liste = { ...Object.assign(tempData, action.payload) };
    },
    cleanAddListe: (state, action) => {
      state.value= {
        listeName: '',
        liste: {},
        selectedListe: {},
      }
    },
    removeListe: (state, action) => {
      state.value= {
        listeName: '',
        liste: {},
        selectedListe: {},
      }
    },
    setSelectedListe: (state, action) => {
      state.value.selectedListe = {
        ...state.value.selectedListe,
        ...action.payload
      }
    },
    removeSelectedListe: (state, action) => {
      state.value = {
        ...state.value,
        selectedListe: action.payload
      }
    },
  }
});

export const { 
  updateListeName,
  addListe,
  removeListe,
  setSelectedListe,
  updateListe,
  cleanAddListe,
} = listeSlice.actions;

export default listeSlice.reducer;
