import { MdEventSeat } from "react-icons/md";
import { FaGear } from "react-icons/fa6";

const CarCard = ({ car }) => {
  const { name, type, transmission, seats, available, pricePerDay, image } = car;
  return (
    <div className="w-fit px-3 rounded-md py-3">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-bold uppercase">{name}</h2>
        <p><span className="font-semibold italic">{type}</span></p>
      </div>
      <div className="flex items-center justify-center mt-2">
        <div className="h-40 w-64 mb-3 flex items-center justify-center overflow-hidden rounded-sm">
          <img src={image} alt="Car" className="object-cover w-full h-full" />
        </div>
      </div>
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
