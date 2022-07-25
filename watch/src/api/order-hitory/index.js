import HTTP from "../http-common";
import {ORDER_HISTORY} from "../endpoints";

export const getOrderHistory = (payload) => {
    return HTTP({
        url: ORDER_HISTORY.GET,
        method: "get",
        data: payload,
    })
}

export const addOrderHistory = (payload) => {
    return HTTP({
        url: ORDER_HISTORY.ADD,
        method: "post",
        params: payload
    })
}

export const updateOrderHistory = (payload) => {
    return HTTP({
        url: ORDER_HISTORY.UPDATE,
        method: "post",
        data: payload
    })
}
