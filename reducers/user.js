import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    userDetails: {
      email: null,
      id: null,
      token: null,

    },
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value.userDetails = { ...state.value.userDetails, ...action.payload };
    },
    /*addPlace: (state, action) => {
      state.value.places.push(action.payload);  
    },
    removePlace: (state, action) => {
      state.value.places = state.value.places.filter(e => e.name !== action.payload);
    },*/
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
