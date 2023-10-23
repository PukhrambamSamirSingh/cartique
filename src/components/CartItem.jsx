import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import PropTypes from "prop-types";
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { decrementQuantityAsync, fetchCartAsync, incrementQuantityAsync, removeItemAsync } from "../reducers/cartSlice"

const CartItem = ({ item }) => {
    const dispatch = useDispatch()

    const handleIncrement = () => {
        dispatch(incrementQuantityAsync(item._id))
            .then(() => {
                // After successfully removing the item, fetch the updated cart data
                dispatch(fetchCartAsync());
            })
            .catch((error) => {
                console.error("Error removing item:", error);
            });
    }
    const handleDecrement = () => {
        dispatch(decrementQuantityAsync(item._id))
            .then(() => {
                // After successfully removing the item, fetch the updated cart data
                dispatch(fetchCartAsync());
            })
            .catch((error) => {
                console.error("Error removing item:", error);
            });
    }

    const handleRemove = () => {
        // Dispatch the removeItemAsync action to remove the item from the cart
        dispatch(removeItemAsync(item._id))
            .then(() => {
                // After successfully removing the item, fetch the updated cart data
                dispatch(fetchCartAsync());
            })
            .catch((error) => {
                console.error("Error removing item:", error);
            });
    };
    return (
        <div className="w-full flex flex-col gap-4 shadow-lg p-4">
            <div className="w-full flex gap-10">
                <div className="w-2/5 sm:w-1/5 flex flex-col gap-2 items-center">
                    <div className="w-28 h-full sm:32">
                        <Link to={`/${item.productId.title}`}>
                            {item.productId?.images && item.productId.images.length > 0 && (
                                <img className="w-full h-full object-contain" src={item.productId.images[0]} alt="" />
                            )}
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <AiOutlineMinusCircle disabled={item.quantity < 2} className="text-xl text-gray-500 cursor-pointer" onClick={handleDecrement} />
                            <button className="border px-2">{item.quantity}</button>
                            <AiOutlinePlusCircle disabled={item.quantity >= item.productId.stocks - 1} className="text-xl text-gray-500 cursor-pointer" onClick={handleIncrement} />
                        </div>
                    </div>
                </div>
                <div className="w-3/5 sm:w-4/5 flex flex-col gap-2">
                    <div className="w-full flex flex-col gap-2">
                        <Link to={`/${item.productId.title}`}>
                            <h2 className="hover:text-blue-600 text-md sm:text-lg">{item?.productId?.title?.substring(0, 50)}...</h2>
                        </Link>
                        <div className="flex gap-2">
                            <h2 className="text-gray-500 hidden sm:block">Price:</h2>
                            <div className="flex items-center gap-2">
                                <p className="text-xl sm:text-xl flex items-start"><span className="text-sm mt-0.5">₹</span>{item.productId.price}</p>
                                <p className="text-xs line-through text-gray-500">M.R.P: ₹{item.productId.cancelPrice}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            {item.color && (
                                <div className="flex gap-2">
                                    <h2 className="text-gray-500">Color selected:</h2>
                                    <span className="capitalize">{item.color}</span>
                                </div>
                            )}
                            {item.size && (
                                <div className="flex gap-2">
                                    <h2 className="text-gray-500">Size selected:</h2>
                                    <span className="capitalize">{item.size}</span>
                                </div>
                            )}
                            {item.productId.size && (
                                <div className="flex gap-2">
                                    <h2 className="text-gray-500">Size</h2>
                                    <span className="capitalize">{item.productId.size}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <div className="flex md:hidden items-center gap-2">
                    <AiOutlineMinusCircle disabled={item.quantity < 2} className="text-2xl text-gray-500 cursor-pointer" onClick={handleDecrement} />
                    <button className="border px-2">{item.quantity}</button>
                    <AiOutlinePlusCircle disabled={item.quantity >= item.productId.stocks - 1} className="text-2xl text-gray-500 cursor-pointer" onClick={handleIncrement} />
                </div>
                <button className="px-2 py-1 border rounded-full" onClick={handleRemove}>Remove</button>
            </div>
        </div>
    )
}

export default CartItem
CartItem.propTypes = {
    item: PropTypes.object.isRequired,
};