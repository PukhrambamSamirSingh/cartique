import { newRequests } from "../utils/newRequests"

export const addToCart = ({ productId, userId, color, size }) => {
    return newRequests.post(`/cart/${productId}`, { productId, userId, color, size })
}

export const fetchCartItems = () => {
    return newRequests.get("/cart/get")
}

export const incrementQuantity = (id) => {
    return newRequests.put(`/cart/increment/${id}`)
}

export const decrementQuantity = (id) => {
    return newRequests.put(`/cart/decrement/${id}`)
}

export const removeItem = (id) => {
    return newRequests.delete(`/cart/delete/${id}`)
}