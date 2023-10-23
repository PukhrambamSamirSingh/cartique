import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addToCart, decrementQuantity, fetchCartItems, incrementQuantity, removeItem } from "../reducerApi/cartApi"

const initialState = {
    items: [],
    loading: false,
    error: null
}

export const addToCartAsync = createAsyncThunk("cart/addToCart", async ({ productId, userId, color, size }) => {
    try {
        const res = await addToCart({ productId, userId, color, size })
        return res.data
    } catch (error) {
        throw new Error(error)
    }
})

export const fetchCartAsync = createAsyncThunk("cart/fetchcartasync", async () => {
    try {
        const res = await fetchCartItems()
        return res.data
    } catch (error) {
        throw new Error(error)
    }
})

export const incrementQuantityAsync = createAsyncThunk("cart/incrementQuantity", async (id) => {
    try {
        const res = await incrementQuantity(id)
        return res.data
    } catch (error) {
        throw new Error(error)
    }
})
export const decrementQuantityAsync = createAsyncThunk("cart/decrementQuantity", async (id) => {
    try {
        const res = await decrementQuantity(id)
        return res.data
    } catch (error) {
        throw new Error(error)
    }
})

export const removeItemAsync = createAsyncThunk("cart/removeItem", async (id) => {
    try {
        const res = await removeItem(id)
        return res.data
    } catch (error) {
        throw new Error(error)
    }
})


export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(fetchCartAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCartAsync.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchCartAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(incrementQuantityAsync.fulfilled, (state, action) => {
                const { id } = action.payload
                const items = state.items.map((item) => {
                    if (item._id === id) {
                        item.quantity++
                    }
                    return item
                })
                state.items = items
            })
            .addCase(decrementQuantityAsync.fulfilled, (state, action) => {
                const { id } = action.payload
                const items = state.items.map((item) => {
                    if (item._id === id) {
                        item.quantity--
                    }
                    return item
                })
                state.items = items
            })
            .addCase(removeItemAsync.fulfilled, (state, action) => {
                const { id } = action.payload
                state.items = state.items.filter((item) => item._id !== id)
            })
    }
})

export default cartSlice.reducer