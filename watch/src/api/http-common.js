import axios from "axios";
import { BASE_URL } from "./config";
import EventBus from "../common/EventBus";

const user = JSON.parse(localStorage.getItem("user"));

const HTTP = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Accept: "application/json, text/plain",
      "Accept-Language": "vi-VN,vi;q=0.9",
       Authorization: "Bearer " + user?.token
      // "x-access-token": user?.token
    },
    withCredentials: false,
  });

  const responseHandler = (response) => {
    return response;
  };

  const requestHandler = (request) => {
    // request.headers.Cookies = `VSA:${getCookie("VSA")};`;
    // // request.headers.Cookie = `JSESSIONID:${getCookie('VSA')};`
    // setListAccessPage([
    //   "DASHBOARD",
    //   "EVENT",
    //   "EVENT_CONVERSION",
    //   "INSIGHT_DASHBOARD",
    //   "PREDICTION",
    // ]);
    // const method = request.method.toLowerCase();
    // if (method === "get" || method === "delete") {
    //   const params = request.params || {};
    //   params["projectId"] = "CCAI";
    //   request.params = params;
    // }
    // if (["post", "put", "delete"].includes(method)) {
    //   const data = request.data || {};
    //   data["projectId"] = "CCAI";
    //   request.data = data;
    // }
    return request;
  };
  
  
  const errorHandler = (error) => {
    if (error.response) {
      const {status, data} = error.response;
      if (status === 401 && data.message) {
        EventBus.on("logout", () => {
        });
      }
    }
    return Promise.reject(error);
  };
  
  HTTP.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
  );
  
  HTTP.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
  );
  
  export default HTTP;
  