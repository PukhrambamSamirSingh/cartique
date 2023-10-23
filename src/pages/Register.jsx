import { useState } from "react"
import { newRequests } from "../utils/newRequests"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "", phone: "" })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await newRequests.post("/auth/create", {
                ...credentials
            })
            setCredentials(res.data)
            if (res.status === 201) {
                navigate("/")
                localStorage.setItem("currentUser", JSON.stringify(res.data))
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
            <div className="shadow-lg rounded-lg border w-full sm:w-3/5 lg:w-1/5 p-4 flex flex-col gap-2 text-white">
                <h1 className="text-2xl font-bold">Register to Cartique</h1>
                {error && (
                    <span className="text-red-500 italic">{error.message}</span>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-xl">Username</label>
                        <input className="bg-transparent p-2 border rounded-md outline-none" type="text" name="username" id="username" onChange={handleChange} required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-xl">Email Address</label>
                        <input className="bg-transparent p-2 border rounded-md outline-none" type="email" name="email" id="email" onChange={handleChange} required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-xl">Phone Number</label>
                        <input className="bg-transparent p-2 border rounded-md outline-none" type="text" name="phone" id="phone" onChange={handleChange} required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-xl">Password</label>
                        <input className="bg-transparent p-2 border rounded-md outline-none" type="password" name="password" id="password" onChange={handleChange} required minLength={5} />
                    </div>
                    <button className="bg-green-500 rounded-md py-2 flex items-center justify-center text-white">{loading ? <img className="w-6 h-6 object-contain" src="https://i.gifer.com/ZZ5H.gif" alt="" /> : "Continue"}</button>
                </form>
                <div className="flex">
                    <p className="text-white">Already have an Account?</p><Link to={"/login"} className="text-blue-600">Sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
