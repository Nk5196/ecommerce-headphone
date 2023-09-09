import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name:"ProductList",
    initialState: {
        items: []
    },
    reducers: {
        ProductList: (state,action) => {
            state.items = [...action.payload];
        },
       
        
    }
});

export const {ProductList, search} =  ProductSlice.actions;

export default ProductSlice.reducer;
