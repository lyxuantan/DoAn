import HTTP from "../http-common";

export const getUserPage = (payload) => {
    return HTTP({
        url: "/admin/user",
        method: "get",
        params: payload,
    })
}

export const deleteUser = (payload) => {
    return HTTP({
        url: "/admin/delete-user",
        method: "get",
        params: payload,
    })
}