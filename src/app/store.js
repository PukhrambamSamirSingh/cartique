import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/productSlice"
import cartReducer from "../reducers/cartSlice";
import wishListReducer from "../reducers/wishListSlice";

const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        wishlist: wishListReducer
    },
    devTools: false
})

export default store