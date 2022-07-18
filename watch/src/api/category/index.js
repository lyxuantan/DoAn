import HTTP from "../http-common";
import {CATEGORY} from '../endpoints';

export const getAllCategory = () => {
    return HTTP({
        url: CATEGORY.GET_ALL,
        method: "GET"
    })
}

export const getCategoryDetail = (payload) => {
    return HTTP({
        url: CATEGORY.GET_DETAIl,
        method: "GET",
        params: payload
    })
}