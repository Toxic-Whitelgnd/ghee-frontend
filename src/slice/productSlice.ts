import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductFromSanity, ProductItems, ProductItemsNew } from "../types/productTypes";

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
const initialState: ProductItemsNew = {
 products: [],
}


export const productSlice = createSlice(
    {
        name: "Product",
        initialState,
        reducers:{
            // setProduct: (state, action : PayloadAction<Product>) => {
            //     const productExists = state.products.some(product => product.name === action.payload.name);

            //     if (!productExists) {
            //         state.products.push({ ...action.payload });
            //     }
            // },
            setfromSanityProduct: (state, action : PayloadAction<ProductFromSanity>) => {
                const productExists = state.products.some(product => product.name === action.payload.name);

                if (!productExists) {
                    state.products.push({ ...action.payload });
                }
            }
        }
    }
)

export const {setfromSanityProduct} = productSlice.actions;

export const selectProduct = (state : {product : Product}) => state.product;

export const selectProducts = (state: { product: ProductItemsNew }) => state.product.products;

export const selectProductById = (state: { product: { products: ProductFromSanity[] } }, _id: string | undefined) =>
    state.product.products.find((product) => product._id === _id);

export const selectProductByName = (state: { product: { products: ProductFromSanity[] } }, name: string | undefined) =>
    state.product.products.find((product) => product.name === name);

export default productSlice.reducer;