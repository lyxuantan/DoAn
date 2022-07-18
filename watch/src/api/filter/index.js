import HTTP from "../http-common";
import {FILTER} from '../endpoints';

export const getCollections = (payload) => {
    return HTTP({
        url: FILTER.GET_ALL_COLLECTION,
        method: "GET",
        data: payload,
    })
}

export const getColor = (payload) => {
    return HTTP({
        url: FILTER.GET_ALL_COLOR,
        method: "GET",
        data: payload,
    })
}

export const getSizes = (payload) => {
    return HTTP({
        url: FILTER.GET_ALL_SIZE,
        method: "GET",
        data: payload,
    })
}