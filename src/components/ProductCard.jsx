import { FaStar } from "react-icons/fa"
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";


const ProductCard = ({ product }) => {
    const deal = ((product.cancelPrice - product.price) / product.cancelPrice) * 100
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
    const createdAtDate = new Date(product.createdAt);
    const timeDifferenceInMs = Date.now() - createdAtDate.getTime();

    const isOneDayAgo = timeDifferenceInMs <= ONE_DAY_IN_MS;

    return (
        <>
            <Link to={`/${product?.title}`} className="flex gap-2 sm:flex-col sm:items-center shadow-md hover:shadow-2xl duration-500 overflow-hidden relative p-2 sm:p-0 border border-gray-300 sm:border-none rounded-md text-white sm:text-inherit">
                <div className="w-1/2 sm:w-full flex justify-center items-center">
                    <img className="w-full h-52 sm:h-72 object-cover sm:object-contain" src={product.images[0]} alt="" />
                </div>
                <div className="w-1/2 sm:w-full flex flex-col sm:items-center p-3">
                    <h2 className="text-md sm:text-lg font-semibold">
                        {product.title.length <= 100 ? product.title : `${product.title.substring(0, 100)}...`}
                    </h2>
                    {!isNaN(product.totalStars / product.starNumber) ? (
                        <div className="flex items-center text-yellow-500">
                            {Array(product.totalStars / product.starNumber).fill().map((_, i) => (
                                <FaStar key={i} />
                            ))}
                            <span className="ml-2">({(product.totalStars / product.starNumber)})</span>
                        </div>
                    ) : (
                        <div className="flex items-center text-yellow-500">
                            {Array(5).fill().map((_, i) => (
                                <FaStar key={i} />
                            ))}
                            <span className="ml-2">(0)</span>
                        </div>
                    )}
                    <div className="gender">
                        <span className="text-md">{product.gender}</span>
                    </div>
                    <div className="flex gap-1">
                        <p className="text-xl sm:text-2xl flex items-start"><span className="text-sm mt-0.5">₹</span>{product.price}</p>
                        <p className="text-sm sm:text-md line-through text-gray-500">M.R.P: ₹{product.cancelPrice}</p>
                        <span className="">({deal.toFixed(0)} % off)</span>
                    </div>
                    {deal >= "20" && (
                        <span className="bg-red-500 max-w-max px-4 py-1 text-sm mt-1 mb-1 text-white">Deal of the day</span>
                    )}
                    {product.colors.length !== 0 && (
                        <>
                            <div className="hidden sm:flex gap-1 mb-1">
                                {product.colors.map((color) => (
                                    <button className="w-5 h-5 rounded-full" key={color} style={{ backgroundColor: `${color}` }}></button>
                                ))}
                            </div>
                            <span className="flex sm:hidden underline text-blue-600">
                                {`+ ${product.colors.length - 1}/patterns`}
                            </span>
                        </>
                    )}
                    {product.sizeString.length !== 0 && (
                        <div className="flex gap-1 mb-1">
                            {product?.sizeString.map((size) => (
                                <button className="max-w-max h-6 p-1 border flex items-center rounded-md bg-gray-700" key={size}>{size}</button>
                            ))}
                        </div>
                    )}
                    {product.sizeNumber.length !== 0 && (
                        <div className="flex gap-1">
                            {product?.sizeNumber.map((size) => (
                                <button className="max-w-max h-6 p-1 border flex items-center rounded-md bg-gray-200" key={size}>{size}</button>
                            ))}
                        </div>
                    )}
                </div>
                {isOneDayAgo && (
                    <span className='absolute top-2 left-2 px-2 py-1 bg-gradient rounded-t-xl rounded-s-xl text-xs text-white'>NEW</span>
                )}
            </Link>
        </>
    )
}

export default ProductCard
ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};