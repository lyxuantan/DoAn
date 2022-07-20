import HTTP from "../http-common";
import {PRODUCT} from '../endpoints';

export const getProduct = (payload) => {
    return HTTP({
        url: PRODUCT.GET,
        method: "POST",
        data: payload,
    })
}

export const getProductDetail = (payload) => {
    return HTTP({
        url: PRODUCT.GET_DETAIl,
        method: "GET",
        params: payload
    })
}