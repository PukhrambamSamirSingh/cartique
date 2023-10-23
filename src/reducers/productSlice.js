import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchProduct } from "../reducerApi/productApi"

const initialState = {
    products: [],
    loading: false,
    error: null
}

export const fetchProductAsync = createAsyncThunk("products/fetchproductasync", async ({ search, minPrice, maxPrice }) => {
    try {
        const res = await fetchProduct({ search, minPrice, maxPrice })
        return res.data
    } catch (error) {
        throw new Error(error)
    }
})

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProductAsync.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
                state.error = null
            })
            .addCase(fetchProductAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default productSlice.reducer