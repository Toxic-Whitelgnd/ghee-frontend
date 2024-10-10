import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice"; 
import cartReducer from "../slice/cartSlice";
import productReducer from "../slice/productSlice";

export const store = configureStore({
    reducer: {
        user: userReducer, 
        cart: cartReducer,
        product:productReducer
    },
});