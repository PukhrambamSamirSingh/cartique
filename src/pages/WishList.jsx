import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { RxCrossCircled } from "react-icons/rx"
import { UserContext } from "../context/UserContext"
import { useDispatch, useSelector } from "react-redux"
import { fetchWishListAsync, removeWishListAsync } from "../reducers/wishListSlice"


const WishList = () => {
    const { err } = useContext(UserContext)
    const { datas, loading, error } = useSelector((state) => state.wishlist)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchWishListAsync())
    }, [dispatch])

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
                {err.response.data}
            </div>
        )
    }
    const deleteItem = async (id) => {
        dispatch(removeWishListAsync(id))
            .then(() => {
                dispatch(fetchWishListAsync())
            }).catch((error) => {
                throw new Error(error)
            })
    }

    return (
        <div className="p-4 sm:px-6 xl:px-16 flex flex-col gap-4 text-white sm:text-black" style={{ minHeight: "calc(100vh - 90px)" }}>
            <div className="flex gap-2 text-xl font-bold">
                <h1>Wishlist</h1>
                <span className="font-semibold">{datas.length}</span>
                <h1>items</h1>
            </div>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                {datas && datas.map((item => (
                    <div key={item._id} className="w-full flex flex-col relative">
                        <div className="absolute top-2 right-2" onClick={() => deleteItem(item?._id)}>
                            <RxCrossCircled className="text-xl cursor-pointer text-gray-500" />
                        </div>
                        <Link to={`/${item?.productId?.title}`} className="w-full h-full shadow-md">
                            <div className="w-full h-44 sm:h-48">
                                <img className="w-full h-full object-cover sm:object-contain" src={item.productId.images[0]} alt="" />
                            </div>
                            <div className="p-2">
                                <h1>{item.productId.title.substring(0, 40)}...</h1>
                                <div className="flex flex-wrap gap-2">
                                    <h1 className="font-bold text-orange-500">Rs. {item.productId.price}</h1>
                                    <span className="line-through text-gray-500">M.R.P. {item.productId.cancelPrice}</span>
                                    <span>
                                        {(((item.productId.cancelPrice - item.productId.price) / item.productId.cancelPrice) * 100).toFixed(0)} % off
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                )))}
            </div>
        </div>
    )
}

export default WishList
