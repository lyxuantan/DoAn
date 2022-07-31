import HTTP from "../http-common";
import {FILTER} from '../endpoints';
import authHeader from "../auth-header";

export const getCollections = (payload) => {
    return HTTP({
        url: FILTER.GET_ALL_COLLECTION,
        method: "GET",
        data: payload,
        headers: authHeader()
    })
}

export const getColor = (payload) => {
    return HTTP({
        url: FILTER.GET_ALL_COLOR,
        method: "GET",
        data: payload,
        headers: authHeader()
    })
}

export const getSizes = (payload) => {
    return HTTP({
        url: FILTER.GET_ALL_SIZE,
        method: "GET",
        data: payload,
        headers: authHeader()
    })
}