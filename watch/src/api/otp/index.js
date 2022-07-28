import HTTP from "../http-common";
import { OTP} from "../endpoints";

export const generateOTP = (payload) => {
    return HTTP({
        url: OTP.MAIL,
        method: "post",
        data: payload,
    })
}

export const validateOTP = (payload) => {
    return HTTP({
        url: OTP.VALIDATE_OTP,
        method: "post",
        data: payload
    })
}
