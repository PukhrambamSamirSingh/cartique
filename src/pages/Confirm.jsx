import { useEffect, useState } from "react"
import { newRequests } from "../utils/newRequests"
import { useDispatch, useSelector } from "react-redux"
import { fetchCartAsync } from "../reducers/cartSlice"
import { Link } from "react-router-dom"

const Confirm = () => {
    const { items, loading, error } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCartAsync())
    }, [dispatch])

    const calculateOverallTotal = () => {
        return items.reduce(
            (result, item) => {
                const { quantity, productId } = item;
                const itemPrice = productId.price || 0;
                result.subPrice += quantity * itemPrice;
                return result;
            },
            { subPrice: 0 }
        );
    };
    const { subPrice } = calculateOverallTotal();


    const [address, setAddress] = useState(null)
    useEffect(() => {
        try {
            const getAddress = async () => {
                const res = await newRequests.get("/address/get")
                setAddress(res.data)
            }
            getAddress()
        } catch (error) {
            throw new Error(error)
        }
    })
    if (loading) {
        return (
            <div className="w-full flex items-center justify-center" style={{
                height: "calc(100vh - 90px)"
            }}>
                <img className="hidden sm:flex" src="https://miro.medium.com/v2/resize:fit:600/1*beQRWt1uWdnQM_nqCwhJnA.gif" alt="" />
                <img className="flex sm:hidden w-9 h-9 object-contain" src="https://i.gifer.com/ZZ5H.gif" alt="" />
            </div>
        )
    }
    if (error) {
        return (
            <div>
                {error}
            </div>
        )
    }

    return (
        <div className="w-full h-full px-4 lg:px-20 py-10 flex flex-col md:flex-row gap-10 text-white sm:text-black">
            <div className="w-full md:w-3/5 flex flex-col gap-10">
                {address && (
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Shipping info</h1>
                        <div className="p-4 flex flex-col gap-1 border border-gray-500 rounded-md">
                            <h2 className="text-lg font-semibold">{address.userId.username}</h2>
                            <span>Phone number: {address.phone}</span>
                            <span>House no. {address.houseNumber}</span>
                            <span>{address.street}</span>
                            <div className="flex gap-1">
                                <span>{address.city},</span>
                                <span>{address.state},</span>
                                <span>{address.pinCode}</span>
                            </div>
                            <span>{address.country}</span>
                            <Link to="/checkout" className="w-full border border-gray-500 rounded-md p-1 flex justify-center">Edit Address</Link>
                        </div>
                    </div>
                )}
                <div className="w-full h-full flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">
                        Your Cart Items
                    </h1>
                    {items && items.map((item) => (
                        <div key={item._id} className="w-full flex gap-2 shadow-md p-2">
                            <div className="w-2/5 xs:w-20 xs:h-20">
                                <img className="w-full h-full  object-contain" src={item.productId.images[0]} alt="" />
                            </div>
                            <div className="w-full">
                                <h2>{item.productId.title}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full md:w-2/5 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Order Summary</h1>
                <div className="flex flex-col gap-4 p-2 border border-gray-500 rounded-md">
                    <div className="flex justify-between">
                        <h2 className="text-gray-500">Subtotal</h2>
                        <span>₹{subPrice}</span>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="text-gray-500">Shipping price</h2>
                        <span>₹0</span>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="text-gray-500">GST</h2>
                        <span>₹{(subPrice * 5) / 100}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <h1 className="font-bold">Total</h1>
                        <span className="font-bold">₹{subPrice + ((subPrice * 5) / 100)}</span>
                    </div>
                </div>
                <Link to="/payment" className="bg-pink-500 flex justify-center p-2 mt-2 rounded-xl text-lg font-semibold text-white">Pay ₹{subPrice + ((subPrice * 5) / 100)}</Link>
            </div>
        </div>
    )
}

export default Confirm
