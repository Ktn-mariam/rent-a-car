import { MdEventSeat } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { NavLink } from 'react-router-dom'

const CarCard = ({ car, setFavouriteCarIds, favouriteCarIds }) => {
  const { id, name, type, transmission, seats, available, pricePerDay, image } = car;

  const isFavourite = favouriteCarIds.includes(id)

  const handleAddToFavourites = () => {
    setFavouriteCarIds((prevFavouriteCarIds) => {
      return [...prevFavouriteCarIds, id]
    })
  }

  const handleRemoveFromFavourites = () => {
    setFavouriteCarIds((prevFavouriteCarIds)=>{
      return prevFavouriteCarIds.filter((carid)=>carid !== id)
    })
  }

  return (
    <div className="w-fit px-3 rounded-md py-3">
      <div className="flex justify-between items-center">
        <NavLink to={`/${id}`} className="flex flex-col justify-between">
          <h2 className="text-lg font-bold uppercase">{name}</h2>
          <p>Type: <span className="font-semibold italic">{type}</span></p>
        </NavLink>
        <div className="mr-3">
          {isFavourite ? 
          <button onClick={handleRemoveFromFavourites}>
            <GoHeartFill className="text-red-500" size={"1.2em"}/> 
          </button>
          :
          <button onClick={handleAddToFavourites}>
            <GoHeart className="text-gray-400" size={"1.2em"}/>
          </button>}
        </div>
      </div>
      <NavLink to={`/${id}`} className="flex items-center justify-center mt-2">
        <div className="sm:h-40 h-32 sm:w-64 w-56 mb-3 flex items-center justify-center overflow-hidden rounded-sm">
          <img src={image} alt="Car" className="object-cover w-full h-full" />
        </div>
      </NavLink>
      <div className="flex gap-2">
          <div className="flex items-center gap-0.5 border-r-2 border-solid border-gray-300 pr-2">
            <FaGear />
            <p className="p-0 m-0 leading-none">{transmission}</p>
          </div>
          <div className="flex items-center gap-0.5 border-r-2 border-solid border-gray-300 pr-2">
            <MdEventSeat />
            <p className="p-0 m-0 leading-none">{seats}</p>
          </div>
          {(available) ? <p className="italic text-green-600">Available</p> :
          <p className="italic text-red-600">Not Available</p>}
      </div>
      <div>
        Price: <span className="font-semibold">{pricePerDay}</span> AED/ Day
      </div>
    </div>
  )
}

export default CarCard
