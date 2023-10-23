import { newRequests } from "../utils/newRequests"

export const fetchProduct = ({ search, minPrice, maxPrice }) => {
    return newRequests.get(`/product/get${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
}