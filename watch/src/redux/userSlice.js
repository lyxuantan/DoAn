import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: "",
    },
    reducers: {
        addUser(state, action) {
            console.log(10, state, action)
            return {
                ...state,
                name: action.payload.name,
            }
            console.log(action.payload)
            // state.set(action.payload);
        },
    }
});

const { actions, reducer } = userSlice;
export const { addUser } = actions;
export default reducer;