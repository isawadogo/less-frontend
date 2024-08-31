import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedCategories: [],
    unreadCount: 0,
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        chooseCategories: (state, action) => {
            state.selectedCategories = action.payload;
        },
        increment: (state) => {
            state.unreadCount += 1; // Incrémenter le compteur de notifications non lues
        },
        reset: (state) => {
            state.unreadCount = 0; // Réinitialiser le compteur de notifications non lues
        },
    },
});

export const { chooseCategories, increment, decrement, reset } = notificationsSlice.actions;
export default notificationsSlice.reducer;
