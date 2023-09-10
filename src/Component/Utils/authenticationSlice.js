// authenticationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
};

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
        },
        errormsg: (state, action) => {

            state.errormsg = action.payload;
        },
        clearError: (state) => {
            state.errormsg = ""; // Clear the error message
        },
        isSignup: (state) => {
            state.isSignup = true
        }
    },
});

export const { setToken, setUser, logout, errormsg, clearError, isSignup } = authenticationSlice.actions;
export default authenticationSlice.reducer;
