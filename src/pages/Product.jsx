import { useNavigate, useParams } from "react-router-dom"
import {
    useQuery
} from '@tanstack/react-query'
import { newRequests } from "../utils/newRequests"
import { useContext, useState } from "react"
import { FaStar } from "react-icons/fa"
import Reviews from "../components/Reviews"
import { UserContext } from "../context/UserContext"
import { useDispatch } from "react-redux"
import { addToCartAsync } from "../reducers/cartSlice"

const Product = () => {
    const { user } = useContext(UserContext)
    const { title } = useParams()
    const [select, setSelect] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSize, setSelectedSize] = useState("")

    const handleSelecetColor = (color) => {
        setSelectedColor(color)
    }
    const handleSelectSize = (e) => {
        setSelectedSize(e.target.value)
    }

    const handleAddToCart = ({ productId, userId, color, size }) => {
        dispatch(addToCartAsync({
            productId,
            userId,
            color,
            size
        }))
            .then(() => {
                navigate("/cart");
            })
            .catch((error) => {
                console.error("Error adding item to cart:", error);
            });
    };

    const { isLoading, error, data } = useQuery({
        queryKey: ['product', title],
        queryFn: async () => {
            const res = await newRequests.get(`/product/getsingle/${title}`)
            return res.data
        }
    })

    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center" style={{
                height: "calc(100vh - 90px)"
            }}>
                <img className="hidden sm:flex" src="https://miro.medium.com/v2/resize:fit:600/1*beQRWt1uWdnQM_nqCwhJnA.gif" alt="" />
                <img className="flex sm:hidden w-9 h-9 object-contain" src="https://i.gifer.com/ZZ5H.gif" alt="" />
            </div>
        )
    }

    if (error) return 'An error has occurred:'

    const handleClick = (i) => {
        setSelect(i)
    }

    return (
        <div className="w-full flex flex-col">
            {data && (
                <div className="w-full flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 hidden md:flex flex-col gap-10 sticky top-24 py-10 mb-10" style={{ height: "calc(100vh - 94px)" }}>
                        <div className="w-full flex flex-col items-center gap-6">
                            <div className="w-full">
                                <img className="w-full sm:h-[480px] object-contain" src={data.images[select]} alt="" />
                            </div>
                            <div className="flex gap-6">
                                {data.images.map((image, i) => (
                                    <img className={`${select === i ? "border-2 border-gray-800" : "border"} w-14 h-10 rounded-md object-cover cursor-pointer`} key={i} src={image} alt="" onClick={() => handleClick(i)} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:hidden py-10" style={{ height: "calc(100vh - 94px)" }}>
                        <div className="w-full flex flex-col items-center gap-10 h-full">
                            <div className="w-full h-5/6">
                                <img className="w-full h-full object-contain" src={data.images[select]} alt="" />
                            </div>
                            <div className="flex gap-2 lg:gap-6">
                                {data.images.map((image, i) => (
                                    <img className={`${select === i ? "border-2 border-gray-800" : "border"} w-14 h-10 rounded-md object-cover cursor-pointer`} key={i} src={image} alt="" onClick={() => handleClick(i)} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-2 px-4 md:py-10 text-white sm:text-inherit">
                        <h1 className="text-lg md:text-xl lg:text-2xl">{data.title}</h1>
                        {data.starNumber !== 0 ? (
                            <div className="flex items-center text-yellow-500">
                                {Array(Math.floor(data.totalStars / data.starNumber)).fill().map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                                <span className="ml-2">({Math.floor(data.totalStars / data.starNumber)} reviews)</span>
                            </div>
                        ) : (
                            <div className="flex items-center text-yellow-500">
                                {Array(5).fill().map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                                <span className="ml-2">(0 reviews)</span>
                            </div>
                        )}
                        <div className="flex gap-2 items-center">
                            {(((data.cancelPrice - data.price) / data.cancelPrice) * 100).toFixed(0) >= "20" && (
                                <span className="bg-red-500 max-w-max px-4 py-1 text-sm mt-1 mb-1 text-white">Deal</span>
                            )}
                            <span className="text-lg">({(((data.cancelPrice - data.price) / data.cancelPrice) * 100).toFixed(0)} % off)</span>
                            <p className="text-2xl sm:text-2xl flex items-start"><span className="text-sm mt-0.5">₹</span>{data.price}</p>
                        </div>
                        <hr className="w-full bg-gray-500" />
                        <div className="flex flex-col gap-2">
                            {data.size && (<div className="flex items-center gap-2">
                                <h4 className="font-semibold">Size:</h4>
                                <span className="capitalize text-sm font-semibold">{data.size}</span>
                            </div>)}
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold">Category:</h4>
                                <span className="capitalize text-sm">{data.cat}</span>
                            </div>
                            {data.brand && (<div className="flex items-center gap-2">
                                <h4 className="font-semibold">Brand:</h4>
                                <span className="capitalize text-sm">{data.brand}</span>
                            </div>)}
                            {data.model && (<div className="flex items-center gap-2">
                                <h4 className="font-semibold">Model name:</h4>
                                <span className="capitalize text-sm">{data.model}</span>
                            </div>)}
                            {data.technology && (<div className="flex items-center gap-2">
                                <h4 className="font-semibold">Technology:</h4>
                                <span className="capitalize text-sm">{data.technology}</span>
                            </div>)}
                        </div>
                        <hr className="w-full bg-gray-700" />
                        <span className="text-sm text-blue-500">Free shipping</span>
                        <div className="flex items-center gap-1">
                            <p>In stock</p>
                            <span>{data.stocks}</span>
                        </div>
                        {data.colors.length !== 0 && (
                            <div className="flex gap-2 items-center">
                                <span className="text-gray-500">
                                    Color:
                                </span>
                                <div className="flex items-center gap-1">
                                    {data.colors.map((color) => (
                                        <button className={`w-5 h-5 rounded-full ${selectedColor === color ? "border-2 border-gray-800" : "border"
                                            }`} key={color} style={{ backgroundColor: `${color}` }} onClick={() => handleSelecetColor(color)}></button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {data.sizeString.length !== 0 && (
                            <div className="flex gap-2 items-center">
                                <span className="text-gray-500">Size:</span>
                                <select className="flex gap-1" onChange={handleSelectSize}>
                                    {data?.sizeString.map((size) => (
                                        <option className="max-w-max h-6 p-1 border border-gray-500 flex items-center rounded-md bg-gray-700 text-black" key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {data.sizeNumber.length !== 0 && (
                            <div className="flex gap-1">
                                {data?.sizeNumber.map((size) => (
                                    <button className="max-w-max h-6 p-1 border flex items-center rounded-md bg-gray-200" key={size}>{size}</button>
                                ))}
                            </div>
                        )}
                        <div className="w-full md:w-4/6 flex gap-4 mt-2 mb-2">
                            <div className="w-full flex gap-2">
                                <button className="w-1/2 px-4 py-1 border rounded-full text-sm font-medium text-white
                            bg-orange-500">BUY NOW</button>
                                <button disabled={!user} onClick={() => handleAddToCart({ productId: data?._id, userId: user?._id, color: selectedColor, size: selectedSize })} className="w-1/2 px-4 py-2 border rounded-full text-sm font-medium text-white bg-orange-600">ADD TO CART</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h5 className="font-semibold text-2xl">About the item</h5>
                            <span className="lg:text-gray-800">{data.desc}</span>
                        </div>
                        <Reviews id={data._id} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Product
