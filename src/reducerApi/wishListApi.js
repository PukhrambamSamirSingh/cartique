import { newRequests } from "../utils/newRequests"

export const addToWishList = ({ productId, userId }) => {
    return newRequests.post(`/wishlist/${productId}`, { productId, userId })
}

export const fetchWishListItems = () => {
    return newRequests.get("/wishlist/get")
}

export const removeWishListItem = (id) => {
    return newRequests.delete(`/wishlist/delete/${id}`)
}