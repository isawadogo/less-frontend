import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    liste: {},
  },
};

export const listeSlice = createSlice({
  name: 'liste',
  initialState,
  reducers: {
    addListe: (state, action) => {
      state.value.liste = {
        ...state.value.liste,
        ...action.payload
      }
      /*
      const findRes = state.value.listes.some((e) => e.listeName === action.payload.listeName)
      if (!findRes) {
        state.value.listes = [ ...state.value.listes, action.payload ];
      } else {
        state.value.listes = state.value.listes.map((l) => {
          if (l.listeName === action.payload.listeName) {
            return action.payload;
          } else {
            return l;
          }
        })
      }
        */
    },
    updateListe: (state, action) => {
      let tempData = { ...state.value.resultatsListe}
      state.value.liste = { ...Object.assign(tempData, action.payload) };
    },
    removeListe: (state, action) => {
      state.value.liste = {}
    },
  }
});

export const { 
  addListe,
} = listeSlice.actions;

export default listeSlice.reducer;
