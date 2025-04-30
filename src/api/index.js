import axios from "axios";
import { METHODS } from "../constants";

const api = axios.create({
  baseURL: "https://fakestoreapi.in/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    // Add any custom request headers or configurations here
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Handle successful responses here
    return response.data;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);

export const setHeaders = (key = "", value) => {
  api.defaults.headers[key] = value;
};

const client = ({
  method = METHODS.GET,
  url = "",
  withCredentials = false,
  auth,
  data,
  ...otherParams
}) => {
  return api({
    method,
    url,
    withCredentials,
    auth,
    data,
    ...otherParams,
  });
};

export default client;
