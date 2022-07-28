import HTTP from "../http-common";
import {PRODUCT} from '../endpoints';

export const getProduct = (payload) => {
    return HTTP({
        url: PRODUCT.GET,
        method: "POST",
        data: payload,
    })
}

export const getAllProduct = () => {
    return HTTP({
        url: PRODUCT.GET_ALL,
        method: "get"
    })
}

export const getProductDetail = (payload) => {
    return HTTP({
        url: PRODUCT.GET_DETAIl,
        method: "GET",
        params: payload
    })
}

export const saveProduct = (payload) => {
    return HTTP({
        url: PRODUCT.ADD,
        method: "post",
        data: payload
    })
}

export const updateProduct = (payload) => {
    return HTTP({
        url: PRODUCT.UPDATE,
        method: "post",
        data: payload
    })
}

export const deleteProduct = (payload) => {
    return HTTP({
        url: PRODUCT.UPDATE,
        method: "get",
        params: payload
    })
}