import HTTP from "../http-common";

export const customerOrderDetailsAll = (payload) => {
    return HTTP({
        url: "/admin/customer-order-details",
        method: "get",
        params: payload
    })
}



