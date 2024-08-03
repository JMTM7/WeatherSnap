import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    matchesDarkMode: false,
    userDarkMode: true,
    userLocale: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserDarkMode(state, action) {
            state.userDarkMode = action.payload.userDarkMode;
        },
        updateMatchesDarkMode(state, action) {
            state.matchesDarkMode = action.payload.matchesDarkMode;
        },
        updateUserLocale(state, action) {
            state.userLocale = action.payload.userLocale;
        },
    },
});

export const {
    updateMatchesDarkMode,
    updateUserDarkMode,
    updateUserLocale,
} = userSlice.actions;

export default userSlice.reducer;
