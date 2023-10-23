import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const ItemCard = ({ product }) => {
    const deal = ((product.cancelPrice - product.price) / product.cancelPrice) * 100
    return (
        <Link to={`/${product.title}`} className="flex flex-col w-full gap-2 text-white sm:text-black shadow p-2">
            <img className="w-full h-40 object-contain" src={product.images[0]} alt="" />
            {deal >= "20" && (
                <span className="bg-red-500 max-w-max px-4 py-1 text-xs text-white">Deal of the day</span>
            )}
            <h3>
                {product.title.length <= 40 ? product.title : `${product?.title?.substring(0, 40)}...`}
            </h3>
            <div>
                <p className="text-xl sm:text-xl flex items-start"><span className="text-sm mt-0.5">₹</span>{product.price}</p>
                <p className="text-xs line-through text-gray-500">M.R.P: ₹{product.cancelPrice} ({deal.toFixed(0)}% off)</p>
            </div>
        </Link>
    )
}

export default ItemCard
ItemCard.propTypes = {
    product: PropTypes.object.isRequired
}
