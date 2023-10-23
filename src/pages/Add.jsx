import { useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"
import { INITIAL_STATE, productsReducer } from "../reducers/productsReducer"
import upload from "../utils/upload"
import { MdDelete } from "react-icons/md"
import { newRequests } from "../utils/newRequests"

const Add = () => {
    const [files, setFiles] = useState([])
    const [uploading, setUploading] = useState(false)
    const [state, dispatch] = useReducer(productsReducer, INITIAL_STATE)

    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value }
        })
    }
    const handleColor = (e) => {
        e.preventDefault()
        dispatch({
            type: "ADD_COLOR",
            payload: e.target[0].value
        })
        e.target[0].value = ""
    }
    const handleSizeString = (e) => {
        e.preventDefault()
        dispatch({
            type: "ADD_SIZESTRING",
            payload: e.target[0].value
        })
        e.target[0].value = ""
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        setUploading(true)
        try {
            const images = await Promise.all(
                [...files].map(async file => {
                    const url = await upload(file)
                    return url
                })
            )
            setUploading(false)
            dispatch({
                type: "ADD_IMAGES",
                payload: { images }
            })
        } catch (error) {
            console.log(error)
        }
    }
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await newRequests.post("/product/create", {
                ...state
            })
            if (res.status === 200) {
                navigate(`/products?search=${res.data?.cat}`)
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <div className="w-full h-full p-4 sm:px-6 xl:px-16">
            <div className="flex flex-col gap-5 lg:gap-10 text-white sm:text-black">
                <h1 className="text-2xl font-bold">Add Product</h1>
                <div className="flex flex-col md:flex-row gap-5 lg:gap-20">
                    <div className="w-full md:w-1/2 flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title">Title</label>
                            <input className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="text" name="title" id="title" placeholder="Enter the product title" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="desc">Description</label>
                            <textarea className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="text" name="desc" id="desc" rows="4" placeholder="Enter the product description" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="images">Product Images</label>
                            <input type="file" multiple onChange={e => setFiles(e.target.files)} />
                            <button className="max-w-max px-4 py-2 bg-green-500 rounded-full" onClick={handleUpload}>{uploading ? "Uploading..." : "Upload"}</button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="gender">Gender</label>
                            <input className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="text" name="gender" id="gender" placeholder="Enter gender type" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="colors">Add colors</label>
                            <form onSubmit={handleColor}>
                                <input className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="text" name="colors" id="colors" placeholder="Enter the product colors" />
                                <button className="max-w-max px-4 py-2 bg-green-500 rounded-full ml-2 text-white" type="submit">add</button>
                            </form>
                            <div className="flex gap-5">
                                {state?.colors?.map((color) => (
                                    <div key={color}>
                                        <button onClick={() => dispatch({
                                            type: "REMOVE_COLOR",
                                            payload: color
                                        })} className="px-2 flex items-center gap-2 bg-red-500 rounded-full text-white">{color}
                                            <MdDelete />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="size">Size (For gadgets e.g. 12GB RAM)</label>
                            <input className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="text" name="size" id="size" placeholder="Enter the product size" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="brand">Brand</label>
                            <input className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="text" name="brand" id="brand" placeholder="Enter the product brand" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="model">Model</label>
                            <input className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="text" name="model" id="model" placeholder="Enter the product model" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="technology">Technology (if any e.g. 5G)</label>
                            <input className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="text" name="technology" id="technology" placeholder="Enter the product technology" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="sizeString">Product Sizes (e.g. SM, XL, XXL)</label>
                            <form onSubmit={handleSizeString}>
                                <input className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="text" name="sizeString" id="sizeString" placeholder="Product sizes" />
                                <button className="max-w-max px-4 py-2 bg-green-500 rounded-full ml-2 text-white" type="submit">add</button>
                            </form>
                            <div className="flex gap-2">
                                {state?.sizeString?.map((size) => (
                                    <div key={size}>
                                        <button onClick={() => dispatch({
                                            type: "REMOVE_SIZESTRING",
                                            payload: size
                                        })} className="px-2 flex items-center gap-2 bg-red-500 rounded-full text-white">{size}
                                            <MdDelete />
                                        </button>
                                    </div>))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="sizeNumber">Product Sizes (e.g. 4, 5, 6, 7)</label>
                            <input className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="text" name="sizeNumber" id="sizeNumber" placeholder="Product sizes" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="stocks">Price</label>
                            <input className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="number" name="price" id="price" placeholder="Product price" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="cancelPrice">Cancel Price</label>
                            <input className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="number" name="cancelPrice" id="cancelPrice" placeholder="Product cancel price" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="stocks">Stocks</label>
                            <input className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="text" name="stocks" id="stocks" placeholder="Product stocks" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="cat">Category</label>
                            <input className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="text" name="cat" id="cat" placeholder="Product category" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="stocks">Sales</label>
                            <input className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="text" name="sales" id="sales" placeholder="Product sales" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="deliveryTime">Delivery time</label>
                            <input className="outline-none bg-transparent p-2 border border-gray-700 rounded-md" type="text" name="deliveryTime" id="deliveryTime" placeholder="Product delivery time" min={1} onChange={handleChange} />
                        </div>
                        <button onClick={handleSubmit} className="p-2 mt-2 bg-green-500 text-xl text-white rounded-md">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add
