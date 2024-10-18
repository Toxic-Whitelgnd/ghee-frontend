import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItems, Items } from "../types/cartTypes"; // Adjust the import path as necessary

const initialState: CartItems = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Items>) => {
            const existingItem = state.cartItems.find(item =>
                item.name === action.payload.name && item.quantity === action.payload.quantity && item.finalPrice === action.payload.finalPrice
            );
           
            if (existingItem) {
                // If item exists, update the quantity
                existingItem.itemQty = (existingItem.itemQty || 1) + 1;

            } else {
            
                // If item doesn't exist, add it to the cart
                state.cartItems.push({ ...action.payload });
            }
        },
        removeItem: (state, action: PayloadAction<Items>) => {
            const existingItem = state.cartItems.find(item =>
                item.name === action.payload.name && item.quantity === action.payload.quantity && item.finalPrice === action.payload.finalPrice
            );

            if (existingItem) {
                // If the quantity is 1, remove the item from the cart
                state.cartItems = state.cartItems.filter(item =>
                    item.name !== action.payload.name || item.quantity !== action.payload.quantity 
                );

            }
        },
        increaseItemQty: (state, action: PayloadAction<Items>) => {
            const existingItem = state.cartItems.find(item =>
                item.name === action.payload.name && item.itemQty === action.payload.itemQty && item.finalPrice === action.payload.finalPrice
            );
            if (existingItem) {
                existingItem.itemQty = (existingItem.itemQty || 1) + 1; // Increment itemQty
            }
        },
        decreaseItemQty: (state, action: PayloadAction<Items>) => {
            const existingItem = state.cartItems.find(item =>
                item.name === action.payload.name && item.itemQty === action.payload.itemQty && item.finalPrice === action.payload.finalPrice
            );
            if (existingItem && existingItem.itemQty && existingItem.itemQty > 1) {
                existingItem.itemQty -= 1;
            }
        },
        clearCart: (state) => {
            // Clear all items from the cart
            state.cartItems = [];
        },
        updateItemQuantity: (state, action) => {
            const { id, newQuantity } = action.payload;
            const item = state.cartItems.find(item => item.name === id);
            if (item) {
                item.itemQty = newQuantity;
            }
        },
    },
});
//TODO: keep the previous price , and add a new quantity price

// Export actions
export const { addItem, removeItem, increaseItemQty, decreaseItemQty, clearCart, updateItemQuantity } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartItems }) => state.cart.cartItems;
export const selectCartTotalQuantity = (state: { cart: CartItems }) =>
    state.cart.cartItems.reduce((total, item) => total + (item.itemQty || 0), 0);
export const selectTotalItems = (state: { cart: CartItems }) =>
    state.cart.cartItems.length;

// Export reducer
export default cartSlice.reducer;
