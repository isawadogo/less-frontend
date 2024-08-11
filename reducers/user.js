import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
      userDetails: {}, 
      displayWelcome: true,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      let tempData = { ...state.value.userDetails }
      state.value.userDetails = { ...Object.assign(tempData, action.payload) };
    },
    updateWelcome: (state, action) => {
      state.value.displayWelcome = action.payload
    }
    /*addPlace: (state, action) => {
      state.value.places.push(action.payload);  
    },
    removePlace: (state, action) => {
      state.value.places = state.value.places.filter(e => e.name !== action.payload);
    },*/
  },
});

export const { updateUser, updateWelcome } = userSlice.actions;
export default userSlice.reducer;
