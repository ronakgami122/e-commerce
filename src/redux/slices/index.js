import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./products.Slice";

const reducers = combineReducers({
  products: productsSlice,
});

export default reducers;
