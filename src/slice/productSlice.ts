import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductItems } from "../types/productTypes";

const productIntialState: Product = {
    id:0,
    name: "Product1",
    price: [120,140,200],
    offerpercentage: 20,
    quantity: 100,
    quantitysize: [100,250,300],
    instock: true,
    ratings: 200,
    ratingStar: "3",
    description:"sdfsd fsd fsd sdfsdf sdf sd f",
}
const initialState: ProductItems = {
 products: [],
}


export const productSlice = createSlice(
    {
        name: "Product",
        initialState,
        reducers:{
            setProduct: (state, action : PayloadAction<Product>) => {
                const productExists = state.products.some(product => product.name === action.payload.name);

                if (!productExists) {
                    state.products.push({ ...action.payload });
                }
            }
        }
    }
)

export const {setProduct} = productSlice.actions;

export const selectProduct = (state : {product : Product}) => state.product;

export const selectProducts = (state: { product: ProductItems }) => state.product.products;

export const selectProductById = (state: { product: { products: Product[] } }, id: number | undefined) =>
    state.product.products.find((product) => product.id === id);

export const selectProductByName = (state: { product: { products: Product[] } }, name: string | undefined) =>
    state.product.products.find((product) => product.name === name);

export default productSlice.reducer;