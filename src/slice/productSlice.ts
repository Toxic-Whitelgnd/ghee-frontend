import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/productTypes";

const initialState: Product = {
    id: 0,
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image: "",  
}

export const productSlice = createSlice(
    {
        name: "Product",
        initialState,
        reducers:{
            setProduct: (state, action : PayloadAction<Partial<Product>>) => {
                return {
                    ...state, ...action.payload,
                }
            }
        }
    }
)

export const {setProduct} = productSlice.actions;

export const selectProduct = (state : {product : Product}) => state.product;

export default productSlice.reducer;