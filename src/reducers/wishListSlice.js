import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addToWishList, fetchWishListItems, removeWishListItem } from "../reducerApi/wishListApi"

const initialState = {
    datas: [],
    loading: false,
    error: null
}

export const addToWishListAsync = createAsyncThunk("cart/addtowishlist", async ({ productId, userId }) => {
    try {
        const res = await addToWishList({ productId, userId })
        return res.data
    } catch (error) {
        throw new Error(error)
    }
})

export const fetchWishListAsync = createAsyncThunk("cart/fetchwishlistasync", async () => {
    try {
        const res = await fetchWishListItems()
        return res.data
    } catch (error) {
        throw new Error(error)
    }
})

export const removeWishListAsync = createAsyncThunk("cart/removeItem", async (id) => {
    try {
        const res = await removeWishListItem(id)
        return res.data
    } catch (error) {
        throw new Error(error)
    }
})

export const wishListSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToWishListAsync.fulfilled, (state, action) => {
                state.datas.push(action.payload)
            })
            .addCase(fetchWishListAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchWishListAsync.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload
            })
            .addCase(fetchWishListAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(removeWishListAsync.fulfilled, (state, action) => {
                const { id } = action.payload
                state.datas = state.datas.filter(item => item._id !== id)
            })
    }
})

export default wishListSlice.reducer