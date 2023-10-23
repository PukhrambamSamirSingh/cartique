import { useState } from "react"
import { BiSearch } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

const Search = () => {
    const [searchInput, setSearchInput] = useState("")
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/products?search=${searchInput}`)
        setSearchInput("")
    }
    return (
        <form onSubmit={handleSubmit} className="w-full flex items-center gap-1 border px-2 py-1 rounded-sm">
            <BiSearch className="text-gray-500" />
            <input type="text" className="outline-none flex items-center border-none bg-transparent text-white w-2/3" placeholder="Search for products..." onChange={(e) => setSearchInput(e.target.value)} />
        </form>
    )
}

export default Search
