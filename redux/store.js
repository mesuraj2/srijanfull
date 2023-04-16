import { configureStore } from "@reduxjs/toolkit";
import {cartReducer} from "./cartSlice";
import { NotificationReducer } from "./NotificationSlice";
// import devToolsEnhancer from "remote-redux-devtools";

export const store = configureStore({
  reducer: {
    counter: cartReducer,
    notification:NotificationReducer
  },
});
