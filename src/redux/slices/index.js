import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./products.slice";
import favoritesSlice from "./favorites.slice";
import cartSlice from "./cart.slice";

const reducers = combineReducers({
  products: productsSlice,
  favorites: favoritesSlice,
  cart: cartSlice,
});

export default reducers;
