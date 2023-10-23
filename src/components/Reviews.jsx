import { useState, useContext, useEffect } from "react";
import { BsStar } from "react-icons/bs"
import { UserContext } from "../context/UserContext";
import PropTypes from "prop-types"
import { newRequests } from "../utils/newRequests";
import ReviewCard from "./ReviewCard";

const Reviews = ({ id }) => {
    const { user } = useContext(UserContext)
    const [desc, setDesc] = useState("");
    const [ratings, setRatings] = useState(0);
    const [loading, setLoading] = useState(false)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        setLoading(true)
        try {
            const fetchReviews = async () => {
                const res = await newRequests.get(`/review/get/${id}`)
                setReviews(res.data)
            }
            fetchReviews()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            throw new Error(error)
        }
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await newRequests.post("/review/create", {
                desc,
                ratings,
                userId: user && user._id,
                productId: id
            })
            setLoading(false)
            setReviews(reviews.concat(res.data))
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const handleDescChange = (e) => {
        setDesc(e.target.value)
    };

    const handleRatingChange = (rating) => {
        setRatings(rating)
    }

    const handleDelete = async (id) => {
        try {
            if (!reviews) {
                return
            }
            await newRequests.delete(`/review/delete/${id}`)
            const newReviews = reviews.filter(review => review._id !== id)
            setReviews(newReviews)
        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <div className="w-full flex flex-col gap-4 mb-10">
            <h1 className="text-2xl text-orange-500 font-semibold">Reviews</h1>
            <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-2 bg-transparent border border-gray-800 rounded-md outline-none"
                    rows={6}
                    id="desc"
                    name="desc"
                    value={desc}
                    onChange={handleDescChange}
                    placeholder="Write your review here"
                    required
                />
                <div className="flex gap-2 items-center">
                    <label className="text-gray-500">Rate:</label>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <BsStar
                                key={rating}
                                className={rating <= ratings ? 'text-orange-500 cursor-pointer' : 'cursor-pointer'}
                                onClick={() => handleRatingChange(rating)}
                            />
                        ))}
                    </div>
                </div>
                <button className="max-w-max px-4 py-2 rounded-full bg-orange-500" type="submit">{loading ? "Submitting..." : "Submit"}</button>
            </form>
            <div className="flex flex-col gap-6">
                {reviews && reviews.length === 0 && (
                    <div className="pt-4">
                        <h1 className="text-xl font-bold">No reviews yet!</h1>
                    </div>
                )}
                {loading ? <img className="w-28 h-full object-contain" src="https://i.stack.imgur.com/hzk6C.gif" alt="" /> : reviews && reviews.map((review) => (
                    <ReviewCard
                        key={review?._id} review={review}
                        reviewId={review?._id}
                        currentUser={review?.userId?._id === user?._id}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    )
}

export default Reviews
Reviews.propTypes = {
    id: PropTypes.string.isRequired
}
