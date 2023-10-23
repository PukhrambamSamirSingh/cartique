import { cards } from "../data/cardui"

const Card = () => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {cards.map((card) => (
                <div className="w-full bg-orange-500 p-1" key={card.id}>
                    <h2 className="text-xl font-bold">{card.title}</h2>
                    <div className="w-full grid grid-cols-2 gap-4 justify-center items-center">
                        {card.urls.map((url, index) => (
                            <div className="items" key={url}>
                                <img className="w-full h-24 object-cover" src={url} alt="" />
                                <p className="text-sm text-white">{card.texts[index]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Card
