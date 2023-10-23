import { AiFillHeart, AiFillEdit } from "react-icons/ai"
import { BsCartCheckFill } from "react-icons/bs"
import { MdDashboard, MdNotificationsNone, MdOutlineEditLocation } from "react-icons/md"
import { FiHelpCircle } from "react-icons/fi"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { Link, useNavigate } from "react-router-dom"
import { newRequests } from "../utils/newRequests"

const Account = () => {
    const { user, setUser } = useContext(UserContext)
    const [admin, setAdmin] = useState(false)
    const navigate = useNavigate()
    const handleToggleAdmin = async () => {
        try {
            const res = await newRequests.put("/user/setadmin", {
                isAdmin: !admin
            })
            if (res.status === 200) {
                setAdmin(!admin)
            }
        } catch (error) {
            throw new Error(error)
        }
    }
    const logout = async () => {
        try {
            const res = await newRequests.post("/auth/logout")
            if (res.status === 200) {
                navigate("/login")
                localStorage.removeItem("currentUser")
                setUser(null)
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <div className="w-full p-4 sm:px-10 lg:px-32 text-white sm:text-black" style={{ minHeight: "calc(100vh - 86px)" }}>
            {user ? (
                <>
                    <div className="flex flex-col gap-4 items-center justify-between">
                        <h1 className="text-xl font-bold italic text-white sm:text-black">Welcome, {user.username}</h1>
                        <img className="w-40 h-40 rounded-full object-cover" src={user.profile || "https://www.selectenglish.co.uk/wp-content/uploads/2022/11/no-user-image.gif"} alt="" />
                    </div>
                    <div className="flex flex-col gap-2 text-white sm:text-gray-500 mt-4">
                        <div className="flex gap-2">
                            <h2 className="text-md font-bold">Email:</h2>
                            <span className="text-gray-500 sm:text-gray-700">{user.email}</span>
                        </div>
                        <div className="flex gap-2">
                            <h2 className="text-md font-bold">About:</h2>
                            <span className="text-gray-500 sm:text-gray-700">{user.desc}</span>
                        </div>
                        <div className="flex gap-2">
                            <h2 className="text-md font-bold">Phone Number:</h2>
                            <span className="text-gray-500 sm:text-gray-700">{user.phone}</span>
                        </div>
                        <div className="flex gap-2">
                            <h2 className="text-md font-bold">Joined on:</h2>
                            <span className="text-gray-500 sm:text-gray-700">{new Date(user.createdAt).toDateString()}</span>
                        </div>
                        {!user?.isAdmin ? (
                            <button onClick={handleToggleAdmin} className="max-w-max px-4 py-2 bg-orange-500 text-white">Become a seller</button>
                        ) : (
                            <button onClick={handleToggleAdmin} className="max-w-max px-4 py-2 bg-orange-500 text-white">A seller</button>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex flex-col w-full gap-2">
                    <h1 className="text-white text-2xl font-semibold">Account</h1>
                    <div className="w-80 h-80 relative">
                        <img className="w-full h-full rounded-full bg-blend-darken" src="https://media.tenor.com/p0G_bmA2vSYAAAAd/login.gif" alt="" />
                        <div className="flex flex-col justify-center gap-1 items-center text-white text-xl absolute top-0 left-0 w-full h-full rounded-full bg-gray-900/50">
                            <Link to="/login" className="text-white px-4 py-2 border flex items-center justify-center rounded-md bg-orange-500">
                                Sign In
                            </Link>
                            <span>to access your account</span>
                        </div>
                    </div>
                </div>
            )}
            {user ? (
                <>
                    <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-6 sm:text-lg mt-4 text-white sm:text-blue-500">
                        <Link to="/dashboard" className="max-w-max flex gap-2 items-center">
                            <MdDashboard className="text-blue-500 text-xl" />
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/wishlist" className="max-w-max flex gap-2 items-center">
                            <AiFillHeart className="text-blue-500 text-xl" />
                            <span>Wishlist</span>
                        </Link>
                        <Link to="/orders" className="max-w-max flex gap-2 items-center">
                            <BsCartCheckFill className="text-blue-500 text-xl" />
                            <span>Orders</span>
                        </Link>
                        <Link to="/profile/edit" className="max-w-max flex gap-2 items-center">
                            <AiFillEdit className="text-blue-500 text-xl" />
                            <span>Edit profile</span>
                        </Link>
                        <Link to="/notifications/edit" className="max-w-max flex gap-2 items-center">
                            <MdNotificationsNone className="text-blue-500 text-xl" />
                            <span>Notifications</span>
                        </Link>
                        <Link to="/location/edit" className="max-w-max flex gap-2 items-center">
                            <MdOutlineEditLocation className="text-blue-500 text-xl" />
                            <span>Edit Location</span>
                        </Link>
                    </div>
                    <div className="mt-4">
                        <button onClick={logout} className="w-full sm:max-w-max px-6 py-2 border border-blue-500 text-blue-500 text-lg">Logout</button>
                    </div>
                </>
            ) : (
                <div className="flex flex-col w-full gap-2">
                    <h1 className="text-2xl font-semibold">Account Settings</h1>
                    <Link to="#" className="max-w-max flex gap-2 items-center">
                        <FiHelpCircle className="text-blue-500 text-xl" />
                        <span>Help Center</span>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Account
