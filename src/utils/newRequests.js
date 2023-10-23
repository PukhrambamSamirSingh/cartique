import axios from "axios"

export const newRequests = axios.create({
    baseURL: "https://cartique-api.onrender.com/api",
    withCredentials: true
})