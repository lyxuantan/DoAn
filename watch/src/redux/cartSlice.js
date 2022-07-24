import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: "",
        user: null,
        total: 0,
        subTotal:0,
        shipCost: null,
        quantity: null,
        status: 0,
        customerOrderDetails: [],
    },
    reducers: {
        getCart(state, action) {
            return {
                ...state,
                id: action.payload.id,
                user: action.payload.user,
                total: action.payload.total,
                subTotal: action.payload.subTotal,
                shipCost:  action.payload.shipCost,
                quantity: action.payload.quantity,
                status: action.payload.status,
                customerOrderDetails: action.payload.customerOrderDetails,
            }
        },
    }
});

const { actions, reducer } = userSlice;
export const { addToCart, getCart } = actions;
export default reducer;