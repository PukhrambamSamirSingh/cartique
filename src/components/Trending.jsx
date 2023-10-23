import { Link, useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import { newRequests } from "../utils/newRequests"
import { AiOutlineHeart } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"

const Trending = ({ trending }) => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        const checkWishlist = async () => {
            if (user) {
                try {
                    const res = await newRequests.get("/wishlist/get")
                    const wishlistItems = res.data
                    const searchItem = wishlistItems.find(item => item?.productId?._id === trending?._id);
                    if (searchItem) {
                        setIsInWishlist(true);
                    }
                } catch (error) {
                    throw new Error(error);
                }
            }
        };
        checkWishlist();
    }, [user, trending._id]);
    const handleWishList = async ({ productId, userId }) => {
        try {
            const res = await newRequests.post(`/wishlist/${productId}`, {
                productId: productId,
                userId: userId
            })
            if (res.status === 200) {
                navigate("/wishlist")
            }
        } catch (error) {
            throw new Error(error)
        }
    }
    return (
        <div className="w-full flex flex-col gap-2 items-center p-2 border border-gray-700 sm:border-none shadow-md hover:shadow-lg duration-500 bg-transparent text-white sm:text-inherit sm:bg-slate-50">
            <Link to={`/${trending?.title}`} className="w-full flex flex-col items-center">
                <img className="w-3/5 h-32 object-contain" src={trending.images[0]} alt="" />
                <span className="">{trending.title.substring(0, 10)}...</span>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-red-500 text-xs sm:text-md">₹{trending.price}</span>
                    <span className="line-through text-gray-500 text-xs sm:text-sm">M.R.P {trending.cancelPrice}</span>
                </div>
            </Link>
            <button disabled={!user || isInWishlist} onClick={() => handleWishList({ productId: trending?._id, userId: user?._id })} className={`${isInWishlist && "bg-orange-500 border-none text-white"} w-full flex justify-center items-center gap-2 border border-gray-800 p-1`}>
                <AiOutlineHeart className="text-lg mt-1" />
                {isInWishlist ? (
                    <span className="hidden xs:block">Added to wishlist</span>
                ) : (
                    <span className="hidden xs:block">Add to wishlist</span>
                )}
            </button>
        </div>
    )
}

export default Trending
Trending.propTypes = {
    trending: PropTypes.object.isRequired
}
