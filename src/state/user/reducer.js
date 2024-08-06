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
        updateUserLocale(state, action) {
            state.userLocale = action.payload.userLocale;
        },
    },
});

export const {
    updateUserLocale,
} = userSlice.actions;

export default userSlice.reducer;
