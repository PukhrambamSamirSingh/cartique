import { MdOutlineLocationOn, MdKeyboardArrowDown } from "react-icons/md"
import Advertisement from "../components/Advertisement"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import Address from "../components/Address"
import { newRequests } from "../utils/newRequests"
import Trending from "../components/Trending"
import Latest from "../components/Latest"

const productDetails = [
    {
        id: 1,
        title: "Redmi 126 cm (50 inches) 4K Ultra HD Android Smart LED TV X50 | L50M6-RA (Black)",
        image: "https://m.media-amazon.com/images/I/71Zwd5aBdFL._AC_UY327_FMwebp_QL65_.jpg",
        price: 29000,
        cancelPrice: 39999
    },
    {
        id: 2,
        title: "Apple 2023 MacBook Pro Laptop M2 Pro chip with 12‑core CPU and 19‑core",
        image: "https://m.media-amazon.com/images/I/618M+ksuptL._AC_UY327_FMwebp_QL65_.jpg",
        price: 179000,
        cancelPrice: 215000
    },
    {
        id: 3,
        title: "Whirlpool 207 L 5 Star Icemagic Pro Inverter Direct-Cool Single Door Refrigerator (230 IMPRO ROY 5S INV SAPPHIRE ABYSS-Z, Base Stand with Drawer, 2023 Model)",
        image: "https://m.media-amazon.com/images/I/61G9HFcW5SL._AC_UY327_FMwebp_QL65_.jpg",
        price: 18990,
        cancelPrice: 25050
    }
]

const Home = () => {
    const { user } = useContext(UserContext)
    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [trendings, setTrendings] = useState([])
    const [products, setProducts] = useState([])
    useEffect(() => {
        setLoading(true)
        try {
            const getProducts = async () => {
                const res = await newRequests.get("/product/get")
                setProducts(res.data)
            }
            getProducts()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }, [])

    const latestProducts = products.slice(0, 6)
    const trendingProducts = trendings.slice(0, 6)
    useEffect(() => {
        setLoading(true)
        try {
            const getTrendings = async () => {
                const res = await newRequests.get("/product/trending")
                setTrendings(res.data)
            }
            getTrendings()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }, [])


    return (
        <div className="w-full h-full pb-10">
            <div className="w-full flex sm:hidden">
                {user && (
                    <div className="flex items-center text-white px-4 py-2">
                        <div className="flex items-center">
                            <MdOutlineLocationOn className="mt-1" />
                            <span className="text-sm">Deliver to {user.username}</span>
                        </div>
                        <MdKeyboardArrowDown onClick={() => setToggle(true)} />
                    </div>
                )}
            </div>
            {toggle && (
                <Address setToggle={setToggle} />
            )}
            <Advertisement />
            <div className="w-full flex flex-col gap-6 p-4 sm:px-6 xl:px-16">
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 mg:grid-cols-4 xl:grid-cols-6 justify-center gap-2 sm:gap-4">
                    {loading ? <img className="w-10 h-10 object-contain" src="https://i.gifer.com/ZZ5H.gif" alt="" /> : error ? <span className="text-white">{error.message}</span> : trendingProducts && trendingProducts.map((trending) => (
                        <Trending key={trending._id} trending={trending} />
                    ))}
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-xl font-semibold text-white sm:text-inherit uppercase">Top deals of this week</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {productDetails.map((p) => (
                            <div className="w-full flex flex-col justify-between gap-4 items-center p-2 bg-gray-800 sm:bg-slate-50 text-white sm:text-inherit" key={p.id}>
                                <h2 className="font-semibold">{p.title}</h2>
                                <button className="px-4 py-2 rounded-full bg-red-500 text-white">SHOP NOW</button>
                                <img className="w-3/5 h-40 object-contain" src={p.image} alt="" />
                                <div className="flex gap-2">
                                    <span>₹{p.price}</span>
                                    <span className="line-through text-gray-500">M.R.P {p.cancelPrice}</span>
                                    <p>{((p.cancelPrice - p.price) * 100 / (p.cancelPrice)).toFixed(0)}% off</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 justify-center gap-2 sm:gap-4">
                    {loading ? <img className="w-10 h-10 object-contain" src="https://i.gifer.com/ZZ5H.gif" alt="" /> : error ? <span>{error.message}</span> : latestProducts && latestProducts.map((product) => (
                        <Latest key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
