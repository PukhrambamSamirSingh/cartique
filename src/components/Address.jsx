import { TbMapPinCode } from "react-icons/tb"
import { MdClose } from "react-icons/md"
import { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { UserContext } from "../context/UserContext"
import { newRequests } from "../utils/newRequests"

const Address = ({ setToggle }) => {
    const { user } = useContext(UserContext)
    const [changePincode, setChangePincode] = useState(false)
    const [address, setAddress] = useState(null)
    const [pinCode, setPinCode] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await newRequests.put("/address/updatepin", { pinCode })
            setPinCode("")
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        try {
            const getAddress = async () => {
                const res = await newRequests.get("/address/get")
                setAddress(res.data)
            }
            getAddress()
        } catch (error) {
            throw new Error(error)
        }
    })

    return (
        <div className="w-screen flex xs:hidden flex-col gap-5 p-4 fixed bg-gray-800 min-h-56 bottom-0 z-10">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-white">Your Address</h1>
                <MdClose className="text-xl text-white" onClick={() => setToggle(false)} />
            </div>
            <div className="border rounded-md p-4">
                <h2 className="text-xl text-white font-semibold">{user && user.username}</h2>
                {address && (
                    <div className="flex flex-col text-gray-500 mt-2">
                        <span>House no. {address.houseNumber}</span>
                        <span>{address.state}</span>
                        <span>{address.city}</span>
                        <span>Pincode: {address.pinCode}</span>
                    </div>
                )}
            </div>
            <div className="w-full">
                {changePincode ? (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-white">
                            <MdClose className="text-xl" onClick={() => setChangePincode(false)} />
                            <span>Change current pincode</span>
                        </div>
                        <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
                            <input value={pinCode} className="p-2 rounded-md bg-transparent outline-none border text-white" type="text" placeholder="Enter new pincode" onChange={(e) => setPinCode(e.target.value)} />
                            <button className="bg-green-500 py-2 rounded-md text-white">Apply</button>
                        </form>
                    </div>
                ) : (
                    <div className="flex gap-1 items-center" onClick={() => setChangePincode(true)}>
                        <TbMapPinCode className="text-xl text-white" />
                        <span className="text-blue-500">Change current pincode</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Address
Address.propTypes = {
    setToggle: PropTypes.func.isRequired
}