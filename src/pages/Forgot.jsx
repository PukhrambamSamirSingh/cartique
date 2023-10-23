import { useState } from "react"
import { newRequests } from "../utils/newRequests"
import { useNavigate } from "react-router-dom"

const Forgot = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await newRequests.put("/user/updatepassword", {
                ...credentials
            })
            setCredentials(res.data)
            if (res.status === 200) {
                navigate("/login")
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.response.data)
        }
    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-800 p-4">
            <div className="shadow-lg rounded-lg w-full sm:w-3/5 lg:w-1/5 p-4 flex flex-col gap-4 border text-white">
                <h1 className="text-2xl font-bold">Update Password</h1>
                {error && (
                    <span className="text-red-500 italic">{error}</span>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xl">Email</label>
                        <input className="bg-transparent border p-2 rounded-md outline-none" type="text" name="email" id="email" onChange={handleChange} required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-xl">Create strong password</label>
                        <input className="bg-transparent border p-2 rounded-md outline-none" type="password" name="password" id="password" onChange={handleChange} required minLength={5} />
                    </div>
                    <button className="bg-green-500 rounded-md py-2 flex items-center justify-center text-white">{loading ? <img className="w-6 h-6 object-contain" src="https://i.gifer.com/ZZ5H.gif" alt="" /> : "Update"}</button>
                </form>
            </div>
        </div>
    )
}

export default Forgot
