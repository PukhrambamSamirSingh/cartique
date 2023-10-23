import { useContext, useEffect, useState } from "react"
import { TbMapPinCode } from "react-icons/tb"
import { MdClose } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { fetchCartAsync } from "../reducers/cartSlice"
import CartItem from "../components/CartItem"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const MyCart = () => {
    const { err } = useContext(UserContext)
    const [changePincode, setChangePincode] = useState(false)
    const [pinCode, setPinCode] = useState("")
    const { items, loading, error } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCartAsync())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("submitted")
    }
    if (err) {
        return (
            <div className="w-full flex flex-col items-center gap-4 pt-12" style={{ height: "calc(100vh - 86px)" }}>
                <h1 className="text-2xl text-white sm:text-black font-bold">{err.response.data}</h1>
                <div className="w-80 h-80 relative">
                    <img className="w-full h-full rounded-full bg-blend-darken" src="https://media.tenor.com/p0G_bmA2vSYAAAAd/login.gif" alt="" />
                    <div className="flex flex-col justify-center gap-1 items-center text-white text-xl absolute top-0 left-0 w-full h-full rounded-full bg-gray-900/50">
                        <Link to="/login" className="text-white px-4 py-2 border flex items-center justify-center rounded-md bg-orange-500">
                            Sign In
                        </Link>
                        <span>to access your cart items</span>
                    </div>
                </div>
            </div>
        )
    }

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
    const calculateOverallTotal = () => {
        return items.reduce(
            (result, item) => {
                const { quantity, productId } = item;
                const itemPrice = productId.price || 0;
                const itemCancelPrice = productId.cancelPrice || 0
                result.totalPrice += quantity * itemPrice;
                result.totalQuantity += quantity;
                result.totalCancelPrice += quantity * itemCancelPrice
                result.discountPrice += (quantity * itemCancelPrice - quantity * itemPrice)
                return result;
            },
            { totalPrice: 0, totalQuantity: 0, discountPrice: 0, totalCancelPrice: 0 }
        );
    };
    const { totalPrice, totalCancelPrice, totalQuantity, discountPrice } = calculateOverallTotal();

    return (
        <div className="w-full h-full flex flex-col md:flex-row gap-10 p-4 lg:px-20 sm:py-5 text-white sm:text-inherit">
            <div className="w-full flex flex-col md:hidden gap-1 shadow-lg">
                <div className="p-4">
                    <h1 className="text-xl font-bold">PRICE DETAILS</h1>
                </div>
                <hr />
                <div className="p-4 flex flex-col gap-2">
                    <div className="flex justify-between">
                        <span>
                            Price ({items.length > 1 ? `${items.length} items` : `${items.length} item`})
                        </span>
                        <span>₹{totalCancelPrice}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>
                            You saved
                        </span>
                        <span>₹{discountPrice}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total quantity selected</span>
                        <span>{totalQuantity}</span>
                    </div>
                </div>
                <hr />
                <div className="p-4 flex justify-between">
                    <h1 className="text-gradient text-2xl">Total Amount</h1>
                    <h1 className="text-2xl">₹{totalPrice}</h1>
                </div>
            </div>
            <div className="block sm:hidden">
                {items && items.length !== 0 && (
                    <Link to={"/checkout"} className="bg-orange-500 max-w-max px-6 py-3 rounded-full text-white">
                        Check Out
                    </Link>
                )}
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-4 lg:gap-10">
                {items && items.length !== 0 && (
                    <div className="w-full shadow-md bg-gray-800 sm:bg-white p-2 rounded-md">
                        {changePincode ? (
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-white sm:text-black lg:text-black">
                                    <MdClose className="text-xl cursor-pointer" onClick={() => setChangePincode(false)} />
                                    <span>Your pincode here</span>
                                </div>
                                <form className="w-full flex flex-col lg:flex-row gap-2" onSubmit={handleSubmit}>
                                    <input value={pinCode} className="w-full p-2 rounded-md bg-transparent outline-none border text-white lg:text-black" type="text" placeholder="Enter pincode" onChange={(e) => setPinCode(e.target.value)} />
                                    <button className="bg-green-500 px-4 py-2 rounded-md text-white">Apply</button>
                                </form>
                            </div>
                        ) : (
                            <button className="flex gap-1 items-center text-blue-500" onClick={() => setChangePincode(true)}>
                                <TbMapPinCode className="text-xl" />
                                <span className="">Use pincode to check delivery info</span>
                            </button>
                        )}
                    </div>
                )}
                <div className="w-full">
                    {items.length === 0 && (
                        <div className="h-4/5 flex flex-col items-center">
                            <h1 className="text-gradient text-xl xs:text-2xl font-bold">Your cart is empty.</h1>
                            <h1 className="text-gradient text-xl xs:text-2xl font-bold">Add some items to your cart!</h1>
                            <img className="xs:w-96 xs:h-96 object-contain" src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="" />
                        </div>
                    )}
                    {items && items.map((item) => (
                        <CartItem key={item._id} item={item} />
                    ))}
                </div>
            </div>
            <div className="w-1/3 hidden md:flex flex-col gap-5" style={{
                height: "calc(100vh - 132px)"
            }}>
                <div className="w-full h-72 flex flex-col gap-1 shadow-lg">
                    <div className="p-4">
                        <h1 className="text-xl font-bold">PRICE DETAILS</h1>
                    </div>
                    <hr />
                    <div className="p-4 flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span>
                                Price ({items.length > 1 ? `${items.length} items` : `${items.length} item`})
                            </span>
                            <span>₹{totalCancelPrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                You saved
                            </span>
                            <span>₹{discountPrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total quantity selected</span>
                            <span>{totalQuantity}</span>
                        </div>
                    </div>
                    <hr />
                    <div className="p-4 flex justify-between">
                        <h1 className="text-gradient text-md md:text-xl lg:text-2xl">Total Amount</h1>
                        <h1 className="text-2xl">₹{totalPrice}</h1>
                    </div>
                </div>
                {items && items.length !== 0 && (
                    <Link to={"/checkout"} className="bg-orange-500 max-w-max px-6 py-3 rounded-full text-white">
                        Check Out
                    </Link>
                )}
            </div>
        </div>
    )
}

export default MyCart
