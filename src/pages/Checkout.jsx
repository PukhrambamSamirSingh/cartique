import { useContext, useEffect, useState } from "react";
import { newRequests } from "../utils/newRequests";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext";

const Checkout = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [info, setInfo] = useState({
        userId: user?._id,
        city: "",
        pinCode: "",
        country: "",
        state: "",
        street: "",
        houseNumber: "",
        phone: ""
    })
    const [address, setAddress] = useState(null)

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
    }, [])
    useEffect(() => {
        if (address) {
            setInfo({
                city: address.city,
                pinCode: address.pinCode,
                country: address.country,
                state: address.state,
                street: address.street,
                houseNumber: address.houseNumber,
                phone: address.phone
            })
        }
    }, [address])
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await newRequests.post("/address/create", {
                ...info
            })
            setInfo(res.data)
            if (res.status === 200) {
                navigate("/confirm")
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }


    return (
        <div className="w-full flex flex-col gap-4 px-4 lg:px-20 py-10 text-white sm:text-black"
            style={{ minHeight: "calc(100vh - 90px)" }}
        >
            <div>
                <h1 className="text-2xl font-semibold">Shipping Details</h1>
            </div>
            <form className="grid grid-cols-1 gap-4 xs:grid-cols-2" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="phone">Phone Number</label>
                    <input name="phone" id="phone" value={info.phone} className="outline-none border border-gray-500 rounded-xl p-2 bg-transparent" type="text" placeholder="Your number here" onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="city">Town/City</label>
                    <input name="city" value={info.city} id="city" className="outline-none border border-gray-500 rounded-xl p-2 bg-transparent" type="text" placeholder="Enter your city" onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="pinCode">Pincode</label>
                    <input name="pinCode" value={info.pinCode} id="pinCode" className="outline-none border border-gray-500 rounded-xl p-2 bg-transparent" type="text" placeholder="Your pincode here" onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="houseNumber">House Number</label>
                    <input name="houseNumber" value={info.houseNumber} id="houseNumber" className="outline-none border border-gray-500 rounded-xl p-2 bg-transparent" type="number" placeholder="Your house number here" onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="street">Area, Street, Sector Or Village</label>
                    <input name="street" id="street" value={info.street} className="outline-none border border-gray-500 rounded-xl p-2 bg-transparent" type="text" placeholder="Enter your street or others" onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="country">Country</label>
                    <select className="p-2 border outline-none border-gray-500 rounded-xl bg-transparent" name="country" id="country" value={info.country} onChange={handleChange}>
                        <option className="text-black" value="">Select a country</option>
                        <option className="text-black" value={"India"}>India</option>
                        <option className="text-black" value={"USA"}>USA</option>
                        <option className="text-black" value={"Bangladesh"}>Bangladesh</option>
                        <option className="text-black" value={"Indonesia"}>Indonesia</option>
                        <option className="text-black" value={"Singapore"}>Singapore</option>
                        <option className="text-black" value={"Taiwan"}>Taiwan</option>
                        <option className="text-black" value={"SriLanka"}>SriLanka</option>
                        <option className="text-black" value={"China"}>China</option>
                        <option className="text-black" value={"SouthKorea"}>SouthKorea</option>
                        <option className="text-black" value={"NorthKorea"}>NorthKorea</option>
                        <option className="text-black" value={"Japan"}>Japan</option>
                        <option className="text-black" value={"Australia"}>Auatralia</option>
                        <option className="text-black" value={"Dubai"}>Dubai</option>
                        <option className="text-black" value={"Germany"}>Germany</option>
                        <option className="text-black" value={"Russia"}>Russia</option>
                        <option className="text-black" value={"London"}>London</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="state">State</label>
                    <input name="state" id="state" value={info.state} className="outline-none border border-gray-500 rounded-xl p-2 bg-transparent" type="text" placeholder="Enter your state name" onChange={handleChange} />
                </div>
                <div className="w-full md:w-1/2 mt-1">
                    <button className="w-full bg-orange-500 px-6 py-2 rounded-xl text-white">Proceed</button>
                </div>
            </form>
        </div>
    )
}

export default Checkout
