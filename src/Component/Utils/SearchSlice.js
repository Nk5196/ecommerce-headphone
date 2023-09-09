import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
    name: "search",
    initialState: {
        items: ""
    },
    reducers: {
        setSearchText: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { setSearchText } = SearchSlice.actions;

export default SearchSlice.reducer;
