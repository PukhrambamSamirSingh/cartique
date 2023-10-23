import { FaStar } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import PropTypes from "prop-types"

const ReviewCard = ({ review, currentUser, handleDelete, reviewId }) => {

    return (
        <div className="w-full flex flex-col gap-4 shadow-lg p-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img className="w-10 h-10 rounded-full object-cover" src={review?.userId?.profile || "https://www.selectenglish.co.uk/wp-content/uploads/2022/11/no-user-image.gif"} alt="" />
                    <span>{review?.username}</span>
                </div>
                <div className="flex items-center text-yellow-500">
                    {Array(review?.ratings).fill().map((_, i) => (
                        <FaStar key={i} />
                    ))}
                    <span className="ml-2">{review?.ratings}</span>
                </div>
            </div>
            <div className="flex justify-between">
                <span>{review?.desc}</span>
                <>
                    {currentUser && (
                        <div className="w-12 h-12">
                            <MdDelete onClick={() => handleDelete(reviewId)} className="text-xl cursor-pointer" />
                        </div>
                    )}
                </>
            </div>
        </div>
    )
}

export default ReviewCard
ReviewCard.propTypes = {
    review: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    currentUser: PropTypes.bool.isRequired,
    reviewId: PropTypes.string.isRequired
}
