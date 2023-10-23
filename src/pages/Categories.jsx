import { Link } from "react-router-dom"
import { items } from "../data/cardui"

const Categories = () => {
    return (
        <div className="w-full p-4 sm:px-6 xl:px-16 block" style={{ minHeight: "calc(100vh - 86px)" }}>
            <div className="w-full grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {items.map((item) => (
                    <Link to={`/products?search=${item.title}`} key={item.id} className="w-full h-40 bg-gray-800 rounded-lg p-2 flex flex-col gap-2 justify-between">
                        <p className="text-white font-sans font-semibold capitalize">{item.title}</p>
                        <img className="w-full h-28 object-contain" src={item.img} alt="" />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Categories
