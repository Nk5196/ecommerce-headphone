import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import cartSlice from "./CartSlice";
import ProductSlice from "./ProductSlice";
import SearchSlice from "./SearchSlice";
import authenticationReducer from './authenticationSlice';

import thunk from 'redux-thunk'; // Import Redux Thunk middleware

const store = configureStore({
    reducer: {
        cart: cartSlice,
        products: ProductSlice,
        search: SearchSlice, // Updated the key name to 'search'
        authentication: authenticationReducer,

    },
    middleware: [thunk], // Apply Redux Thunk middleware

});

export default store;
