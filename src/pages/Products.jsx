import { useDispatch, useSelector } from "react-redux"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import { fetchProductAsync } from "../reducers/productSlice"
import { useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import ItemCard from "../components/ItemCard"


const Products = () => {
    const { search } = useLocation()
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const dispatch = useDispatch()
    const { products, loading, error } = useSelector((state) => state.product)

    useEffect(() => {
        dispatch(fetchProductAsync({ search, minPrice, maxPrice }))
    }, [dispatch, search])

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center" style={{
                height: "calc(100vh - 90px)"
            }}>
                <img className="hidden sm:flex" src="https://miro.medium.com/v2/resize:fit:600/1*beQRWt1uWdnQM_nqCwhJnA.gif" alt="" />
                <img className="flex sm:hidden w-9 h-9 object-contain" src="https://i.gifer.com/ZZ5H.gif" alt="" />
            </div>
        )
    }
    const firstProducts = products.slice(0, 4);
    const otherProducts = products.slice(4);
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchProductAsync({ search, minPrice, maxPrice }))
    }

    if (error) {
        return (
            <div>
                <span>{error}</span>
            </div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full h-full">
            <div className="hidden md:flex w-1/6">
                <Sidebar
                    search={search}
                    handleSubmit={handleSubmit}
                    minPrice={parseInt(minPrice)}
                    maxPrice={parseInt(maxPrice)}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                />
            </div>
            <div className="flex flex-col gap-2 md:hidden my-1 p-4">
                <h1 className="text-white sm:text-black font-semibold">Select price range</h1>
                <div className="w-full flex flex-col gap-2">
                    <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
                        <div className="flex md:flex-col lg:flex-row gap-2">
                            <input
                                className="w-full xs:w-3/5 px-2 border border-gray-800 rounded-md py-1" type="number"
                                placeholder="min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <input
                                className="w-full xs:w-3/5 px-2 border border-gray-800 rounded-md py-1"
                                type="number"
                                placeholder="max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="flex items-center justify-center p-2 bg-gray-700 rounded-md text-white">Apply</button>
                    </form>
                </div>
            </div>
            <div className="w-full md:w-5/6 sm:my-2 lg:my-10 relative px-4 pb-6">
                {products.length === 0 && (
                    <div className="sm:absolute w-full h-full flex flex-col justify-center items-center">
                        <h1 className="text-gradient text-3xl font-bold">No Items Found!</h1>
                        <img className="w-4/5 h-4/5 object-contain hidden sm:block" src="https://elements-cover-images-0.imgix.net/41ce1856-ce64-47eb-9cc9-d50c75ba936b?auto=compress%2Cformat&fit=max&w=900&s=501aef4930c224609ff884797e50331d" alt="" />
                        <img className="sm:hidden w-full h-full" src="https://cdni.iconscout.com/illustration/premium/thumb/file-not-found-4427732-3692600.png" alt="" />
                    </div>
                )}
                {firstProducts.length !== 0 && (
                    <div className="w-full flex flex-col gap-2">
                        <h1 className="text-lg font-semibold text-white sm:text-inherit">Newly Launched</h1>
                        <div className="w-full grid grid-cols-2 xs:grid-cols-3 xl:grid-cols-4 gap-4">
                            {firstProducts.map((product) => (
                                <ItemCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
                {otherProducts.length !== 0 && (
                    <div className="w-full mt-5 flex flex-col gap-2">
                        <h1 className="text-lg font-semibold text-white sm:text-inherit">Results</h1>
                        <div className="w-full grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {otherProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products
