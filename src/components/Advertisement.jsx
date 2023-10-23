import { useEffect, useState } from "react";
import { images } from "../data/adver"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

const Advertisement = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? prevIndex : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? prevIndex : prevIndex - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="w-full relative">
            {images.map((img, index) => (
                <div key={img.id} className={`h-32 w-full lg:h-72 overflow-y-hidden ${index !== currentIndex ? 'hidden' : ''}`}>
                    <img className="w-full object-contain" src={img.image} alt="" />
                </div>
            ))}
            <div className='w-full flex items-center justify-between gap-2 absolute top-10 md:top-1/2'>
                <IoIosArrowBack disabled={currentIndex === 0}
                    onClick={handlePrevious} className='text-white text-3xl cursor-pointer' />
                <IoIosArrowForward disabled={currentIndex === images.length - 1}
                    onClick={handleNext} className='text-white text-3xl cursor-pointer' />
            </div>
        </div>
    )
}

export default Advertisement
