import {createSlice} from "@reduxjs/toolkit";

const slideSlice = createSlice({
    name: 'category',
    initialState: {
        listCategory: [],
    },
    reducers: {
        addCategory(state, action) {
            console.log(10, state, action)
            return {
                ...state,
                listCategory: action.payload,
            }
        },
    }
});

const { actions, reducer } = categorySlice;
export const { addCategory } = actions;
export default reducer;
