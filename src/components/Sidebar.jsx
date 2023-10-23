import PropTypes from "prop-types"

const Sidebar = ({ handleSubmit, minPrice, maxPrice, setMinPrice, setMaxPrice, search }) => {
    const queryString = search;
    const searchParamValue = queryString.split("=")[1];
    const capitalizedSearchValue = searchParamValue?.charAt(0).toUpperCase() + searchParamValue?.slice(1);

    return (
        <div className="w-full p-2 shadow-lg sticky top-[88px]" style={{
            height: "calc(100vh - 90px)"
        }}>
            <div className="flex flex-col gap-2 my-10">
                <div className="flex flex-col">
                    <h4 className="text-xl font-semibold">Query</h4>
                    <span className="ml-4">{capitalizedSearchValue}</span>
                </div>
                <h1>Price</h1>
                <div className="w-full flex flex-col gap-2">
                    <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
                        <div className="flex md:flex-col lg:flex-row gap-2">
                            <input
                                className="w-full px-2 border border-gray-800 rounded-md py-1" type="number"
                                placeholder="min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <input
                                className="w-full px-2 border border-gray-800 rounded-md py-1"
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
        </div>
    )
}

export default Sidebar
Sidebar.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    minPrice: PropTypes.number.isRequired,
    maxPrice: PropTypes.number.isRequired,
    setMinPrice: PropTypes.func.isRequired,
    setMaxPrice: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired
};
