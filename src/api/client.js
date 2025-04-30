import client from ".";
import { METHODS } from "../constants";

export const api = {
  AUTH: {
    login: ({ data, ...config }) =>
      client({ method: METHODS.POST, baseURL: 'https://fakestoreapi.com', url: "/auth/login", data, ...config }),
  },
  PRODUCTS: {
    getAll: ({ data, ...config }) =>
      client({ url: "/products", data, ...config }),
    getById: ({ id, data, ...config }) =>
      client({ url: `/products/${id}`, data, ...config }),
    getByCategory: ({ categoryName, data, ...config }) =>
      client({ url: `/category/${categoryName}`, data, ...config }),
  },
  CATEGORIES: {
    getAll: ({ data, ...config }) =>
      client({ url: "/categories", data, ...config }),
  },
  USERS: {
    getAll: ({ data, ...config }) => client({ url: "/users", data, ...config }),
    getById: ({ id, data, ...config }) =>
      client({ url: `/users/${id}`, data, ...config }),
  },
  CARTS: {
    getAll: ({ data, ...config }) => client({ url: "/carts", data, ...config }),
    getById: ({ id, data, ...config }) =>
      client({ url: `/carts/${id}`, data, ...config }),
  },
};
