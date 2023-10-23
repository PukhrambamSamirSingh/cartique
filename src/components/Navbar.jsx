import { useContext, useState } from "react"
import { MdDashboard } from "react-icons/md"
import { BsCart, BsCartCheck, BsCartPlus } from "react-icons/bs"
import { AiOutlineHome, AiOutlineUser, AiOutlinePlus, AiOutlineHeart } from "react-icons/ai"
import { BiCategory } from "react-icons/bi"
import { FiLogOut } from "react-icons/fi"
import Search from "./Search"
import "animate.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { newRequests } from "../utils/newRequests"
import { FaRegUserCircle } from "react-icons/fa"
import { BiMessage } from "react-icons/bi"
import { useSelector } from "react-redux"

const Navbar = () => {
    const { pathname } = useLocation()
    const [toggle, setToggle] = useState(false)
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const { items } = useSelector(state => state.cart)
    const { datas } = useSelector(state => state.wishlist)

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
        <div className="w-full sticky top-0 z-10">
            <div className="bg-gray-800">
                <div className="flex gap-2 sm:hidden px-4 pt-4">
                    <Search />
                    <Link to={"/cart"} className="flex items-center gap-1 text-white">
                        <div className="relative">
                            <BsCart className="text-xl" />
                            <span className="absolute right-[-4px] top-[-8px] w-4 h-4 flex items-center justify-center rounded-full bg-orange-500 text-sm text-white">{items && items.length}</span>
                        </div>
                    </Link>
                </div>
                <div className="w-full flex justify-between items-center px-5 md:px-10 lg:px-16 py-2">
                    <Link to={"/"} className="hidden sm:block">
                        <span className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-300">Cartique</span>
                    </Link>
                    <div className="w-2/5 hidden sm:flex">
                        <Search />
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                        {user ? (
                            <div className="flex items-center gap-1 relative">
                                <div className="flex items-center gap-1 cursor-pointer" onClick={() => setToggle(prev => !prev)}>
                                    <img className="w-10 h-10 rounded-full object-cover" src={user.profile || "https://www.selectenglish.co.uk/wp-content/uploads/2022/11/no-user-image.gif"} alt="" />
                                    <span className="text-white">{user.username}</span>
                                </div>
                                {toggle && (
                                    <div className="absolute bg-gray-800 text-white rounded-md shadow-md top-20 right-2 animate__animated animate__fadeInDown w-60 h-64 p-4 flex flex-col gap-4 z-10">
                                        <Link to={"/dashboard"} className="flex gap-2 items-center">
                                            <MdDashboard />
                                            <span>Dashboard</span>
                                        </Link>
                                        <Link to={"/account"} className="flex gap-2 items-center">
                                            <FaRegUserCircle className="text-xl" />
                                            <span>Account</span>
                                        </Link>
                                        <Link to={"/orders"} className="flex gap-2 items-center">
                                            <BsCartCheck className="text-xl" />
                                            <span>Orders</span>
                                        </Link>
                                        {user?.isAdmin && (
                                            <>
                                                <Link to={"/messages"} className="flex gap-2 items-center">
                                                    <BiMessage className="text-xl" />
                                                    <span>Messages</span>
                                                </Link>
                                                <Link to={"/add"} className="flex gap-2 items-center">
                                                    <BsCartPlus className="text-xl" />
                                                    <span>Add Product</span>
                                                </Link>
                                            </>
                                        )}
                                        <button onClick={logout} className="flex gap-2 items-center">
                                            <FiLogOut className="text-xl" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link to={"/login"} className="border px-2 py-1 text-white rounded-sm">Sign in</Link>
                                <Link to={"/register"} className="border hidden md:block px-2 py-1 text-white rounded-sm">Register</Link>
                            </div>
                        )}
                        <Link to={"/wishlist"} className="hidden sm:flex items-center gap-1 text-white">
                            <div className="relative">
                                <AiOutlineHeart className="text-xl" />
                                <span className="absolute right-[-4px] top-[-8px] w-4 h-4 flex items-center justify-center rounded-full bg-orange-500 text-sm text-white">{datas && datas.length}</span>
                            </div>
                            <span>Wishlist</span>
                        </Link>
                        <Link to={"/cart"} className="hidden sm:flex items-center gap-1 text-white">
                            <div className="relative">
                                <BsCart className="text-xl" />
                                <span className="absolute right-[-4px] top-[-8px] w-4 h-4 flex items-center justify-center rounded-full bg-orange-500 text-sm text-white">{items && items.length}</span>
                            </div>
                            <span>Cart</span>
                        </Link>
                    </div>
                </div>
                <hr />
                <div className="hidden sm:flex justify-around items-center py-1">
                    <Link to="/products?search=tshirts" className="text-white text-xs sm:text-lg">Thsirts</Link>
                    <Link to="/products?search=pants" className="text-white text-xs sm:text-lg">Pants</Link>
                    <Link to="/products?search=mobiles" className="text-white text-xs sm:text-lg">Mobiles</Link>
                    <Link to="/products?search=hoodies" className="text-white text-xs sm:text-lg">Hoodies</Link>
                    <Link to="/products?search=cosmetics" className="text-white text-xs sm:text-lg">Cosmetics</Link>
                    <Link to="/products?search=electronics" className="text-white text-xs sm:text-lg">Electronics</Link>
                    <Link to="/products?search=laptops" className="text-white text-xs sm:text-lg">Laptops</Link>
                    <Link to="/products?search=gadgets" className="text-white text-xs sm:text-lg">Gadgets</Link>
                </div>
            </div>
            <div className="w-full flex justify-between sm:hidden bg-gray-800 fixed bottom-0 py-2 px-4">
                <Link to="/" className={`${pathname === "/" ? "text-blue-500" : "text-white"} flex flex-col justify-center items-center`}>
                    <AiOutlineHome />
                    <span className="text-sm">Home</span>
                </Link>
                <Link to="/account" className={`${pathname === "/account" ? "text-blue-500" : "text-white"} flex flex-col justify-center items-center`}>
                    <AiOutlineUser />
                    <span className="text-sm">Account</span>
                </Link>
                {user?.isAdmin && (
                    <Link to="/add" className={`${pathname === "/add" ? "text-blue-500" : "text-white"} flex flex-col justify-center items-center`}>
                        <AiOutlinePlus />
                        <span className="text-sm">Create</span>
                    </Link>
                )}
                <Link to="/categories" className={`${pathname === "/categories" ? "text-blue-500" : "text-white"} flex flex-col justify-center items-center`}>
                    <BiCategory />
                    <span className="text-sm">Categories</span>
                </Link>
                {user && (
                    <Link to="/wishlist" className={`${pathname === "/wishlist" ? "text-blue-500" : "text-white"} flex flex-col justify-center items-center`}>
                        <AiOutlineHeart />
                        <span className="text-sm">Wishlist</span>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Navbar
