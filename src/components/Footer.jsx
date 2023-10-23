import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"
import { MdOutlineLocationOn } from "react-icons/md"

const Footer = () => {
    return (
        <div className="w-full flex flex-col gap-2 bg-gray-700">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center lg:justify-between p-4 text-gray-500 gap-10 xl:px-16">
                <div className="flex flex-col items-center lg:items-start gap-2">
                    <Link to={"/"}>
                        <span className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-300">Cartique</span>
                    </Link>
                    <div className="flex items-center">
                        <MdOutlineLocationOn className="mt-1 text-lg" />
                        <span className="text-sm">Babupara, Jiribam Ward No. 5</span>
                    </div>
                    <h1 className="text-black">Follow us on</h1>
                    <div className="flex gap-2">
                        <FaFacebook className="text-lg" />
                        <FaTwitter className="text-lg" />
                        <FaInstagram className="text-lg" />
                    </div>
                </div>
                <div className="flex flex-col items-center lg:items-start gap-2">
                    <h2 className="underline font-bold text-sm text-black">Terms Of Use</h2>
                    <span className="text-sm">Privacy & policy</span>
                    <span className="text-sm">Return Policy</span>
                    <span className="text-sm">Shipping</span>
                </div>
                <div className="flex flex-col items-center lg:items-start gap-2">
                    <Link to="/account">Account</Link>
                    <Link to="/wishlist" className="text-sm">Wishlist</Link>
                    <Link to="/cart" className="text-sm">Shopping Cart</Link>
                    <Link to="/orders" className="text-sm">Track My Order</Link>
                </div>
                <div className="flex flex-col items-center lg:items-start gap-2">
                    <h1 className="text-lg font-bold text-black">Subscribe Newsletter</h1>
                    <span>{"Let's"} stay updated on the latest news and offers</span>
                    <div className="border border-gray-500 p-2 flex justify-between bg-white rounded-md">
                        <input className="outline-none border-none bg-transparent" type="text" placeholder="Enter email..." />
                        <button className="text-red-500 font-bold">SUBSCRIBE</button>
                    </div>
                </div>
            </div>
            <hr className="h-0 border border-gray-300" />
            <span className="text-center mb-2 text-white">&copy; All Rights Reserved 2023</span>
        </div>
    )
}

export default Footer

