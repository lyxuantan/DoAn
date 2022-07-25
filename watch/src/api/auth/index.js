import HTTP from "../http-common";
import {AUTH, MAIL} from '../endpoints';

export const registerApi = () => {
    return HTTP({
        url: AUTH.REGISTER,
        method: "post"
    })
}

export const loginApi = (payload) => {
    return HTTP({
        url: AUTH.LOGIN,
        method: "post",
        data: payload
    })
}

export const logout = () => {
    localStorage.removeItem("user");
};

export const sendMail = (payload) => {
    return HTTP({
        url: MAIL.MAIL,
        method: "post",
        data: payload
    })
}