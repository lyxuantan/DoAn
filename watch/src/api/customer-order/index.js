import HTTP from "../http-common";
import {CUSTOMER_ORDER} from '../endpoints';

export const updateCustomerOrder = (payload) => {
    return HTTP({
        url: CUSTOMER_ORDER.UPDATE,
        method: "POST",
        data: payload
    })
}

export const getCustomerOrder = (payload) => {
    return HTTP({
        url: CUSTOMER_ORDER.GET_ORDER_IS_PAID,
        method: "GET",
        params: payload
    })
}

export const deleteCustomerOrderDetail = (payload) => {
    return HTTP({
        url: CUSTOMER_ORDER.DELETE_CUSTOMER_ORDER,
        method: "GET",
        params: payload,
    })
}
