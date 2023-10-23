import { useContext, useState } from "react"
import ProfileImg from "../components/ProfileImg"
import { newRequests } from "../utils/newRequests"
import { UserContext } from "../context/UserContext"

const ProfileEdit = () => {
    const { user } = useContext(UserContext)
    const [updating, setUpdating] = useState(false)
    const [credentials, setCredentials] = useState({
        username: user && user?.username || "",
        desc: user && user?.desc || ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUpdating(true)
        try {
            const res = await newRequests.put("/user/updateuser", {
                ...credentials
            })
            setCredentials(res.data)
            setUpdating(false)
        } catch (error) {
            setUpdating(false)
            throw new Error(error)
        }
    }
    const handleChange = (e) => {
        console.log("Input changed", e.target.value)
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="w-full py-4 px-4 sm:px-20 md:px-32 flex flex-col gap-4" style={{
            minHeight: "calc(100vh - 94px)"
        }}>
            {user && <ProfileImg />}
            {user && (
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 text-white sm:text-gray-800">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="font-bold">Username</label>
                        <input className="p-2 bg-transparent outline-none border border-gray-500" value={credentials?.username} type="text" name="username" id="username" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="desc" className="font-bold">About</label>
                        <textarea className="p-2 bg-transparent outline-none border border-gray-500" value={credentials?.desc} type="text" name="desc" id="desc" rows="6" onChange={handleChange} />
                    </div>
                    <button className="bg-orange-500 text-white p-2 rounded-md sm:max-w-max px-4">{updating ? "Updating" : "Update"}</button>
                </form>
            )}
        </div>
    )
}

export default ProfileEdit
