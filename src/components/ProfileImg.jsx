import { BiImageAdd } from "react-icons/bi"
import upload from "../utils/upload"
import { newRequests } from "../utils/newRequests"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"

const ProfileImg = () => {
    const { user } = useContext(UserContext)
    const [selectedImage, setSelectedImage] = useState(null)
    const [saving, setSaving] = useState(false)
    const [pic, setPic] = useState({
        profile: user?.profile
    })
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedImage) {
            console.log("No image was uploaded");
            return;
        }
        setSaving(true)
        const url = await upload(selectedImage);
        try {
            const res = await newRequests.put("/user/setimage", {
                profile: url
            });
            setPic({ ...pic, ...res.data });
            setSaving(false)
        } catch (error) {
            setSaving(false)
            console.log(error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        } else {
            console.log("No image was uploaded")
        }
    };
    return (
        <form onSubmit={handleSubmit} className="relative max-w-max flex flex-col gap-2">
            {user && (
                <div className="w-48 h-48 xs:w-60 xs:h-60 md:w-48 md:h-48 lg:w-60 lg:h-60 relative">
                    {selectedImage ? (
                        <img className="w-full border border-gray-500 rounded-full h-full object-cover" src={URL.createObjectURL(selectedImage)} alt="" />
                    ) : (
                        <img className="w-full border border-gray-500  rounded-full h-full object-cover" src={user.profile || "https://www.selectenglish.co.uk/wp-content/uploads/2022/11/no-user-image.gif"} alt="" />
                    )}
                    <div className="w-full h-full absolute top-0 left-0 hover:bg-gray-900/50 duration-200 hover:text-white flex items-center justify-center rounded-full">
                        <label htmlFor="file">
                            <BiImageAdd className="text-3xl cursor-pointer" />
                            <input type="file" name="file" id="file" className="hidden" onChange={handleImageChange} />
                        </label>
                    </div>
                </div>
            )}
            <div className="pt-2">
                <button className="bg-orange-500 px-4 py-2 rounded-lg">
                    {saving ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    )
}

export default ProfileImg
