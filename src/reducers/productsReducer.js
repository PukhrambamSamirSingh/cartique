export const INITIAL_STATE = {
    userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
    title: "",
    desc: "",
    images: [],
    gender: "",
    colors: [],
    size: "",
    brand: "",
    model: "",
    technology: "",
    sizeString: [],
    sizeNumber: [],
    stocks: 0,
    price: 0,
    cancelPrice: 0,
    cat: "",
    sales: 0,
    deliveryTime: 0
}

export const productsReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case "ADD_IMAGES":
            return {
                ...state,
                images: action.payload.images
            }
        case "ADD_COLOR":
            return {
                ...state,
                colors: [...state.colors, action.payload]
            }
        case "REMOVE_COLOR":
            return {
                ...state,
                colors: state.colors.filter(color => color !== action.payload)
            }
        case "ADD_SIZESTRING":
            return {
                ...state,
                sizeString: [...state.sizeString, action.payload]
            }
        case "REMOVE_SIZESTRING":
            return {
                ...state,
                sizeString: state.sizeString.filter(sizestring => sizestring !== action.payload)
            }
        case "ADD_SIZENUMBER":
            return {
                ...state,
                sizeNumber: [...state.sizeNumber, action.payload]
            }
        case "REMOVE_SIZENUMBER":
            return {
                ...state,
                sizeNumber: state.sizeNumber.filter(sizenumber => sizenumber !== action.payload)
            }
        default:
            return state;
    }
}