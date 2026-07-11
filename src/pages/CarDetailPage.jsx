import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCar } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { TiTick } from "react-icons/ti";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

const CarDetailPage = ({favouriteCarIds, setFavouriteCarIds}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [carDetail, setCarDetail] = useState(null)
  const { carid } = useParams() 
  let id = Number(carid)
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

  useEffect(() => {
      const fetchCars = async () => {
        try {
          const carsData = await fetch('/data/cars.json')
          const cars = await carsData.json()
          const car = cars.filter((car) => car.id === id)
          if (car.length === 0) {
            throw new Error(`Not found! Car with id ${carid} does not exist.`)
          }
          
          setCarDetail(car[0])
        } catch (error) {
          setError(error)
        } finally {
          setLoading(false)
        }
      }
  
      fetchCars()
    }, [])
  
  return (
    <div className='mt-10 mx-20'>
      {loading && !error && <div>Loading</div>}
      {error && 
        <div className='flex flex-col items-center gap-2'>
          <GoAlertFill size={"1.75em"} />
          <p className='text-center'>{error.message}</p>
        </div>}
      {!loading && !error && 
      <div className='w-full flex md:mt-18 md:flex-row flex-col gap-5 md:gap-10 md:items-center'>
        <div className='md:w-1/2 w-full'>
          <div className="w-full mb-3 flex items-center justify-center overflow-hidden">
            <img src={carDetail.image} alt="Car" className="object-cover w-full h-full" />
          </div>
        </div>
        <div className='md:w-1/2 w-full'>
          <div className='flex items-end justify-between mb-7 border-b-2 border-solid border-gray-200 pb-2'>
            <h1 className='text-4xl font-bold italic'>{carDetail.name}</h1>
            {isFavourite ? 
            <button className='flex items-center gap-1' onClick={handleRemoveFromFavourites}>
              <GoHeartFill className="text-red-500" size={"1.2em"}/>
              <p className='italic text-red-500 leading-none hidden lg:inline'>Added to Favourites</p>
            </button>
            :
            <button  className='flex items-center gap-1' onClick={handleAddToFavourites}>
              <GoHeart className="text-gray-400" size={"1.2em"}/>
              <p className='italic leading-none hidden lg:inline'>Add to Favourites</p>
            </button>}
          </div>
          <div className='flex items-center gap-2 mb-2'>
            <FaCar size={"1.2em"} className='text-zinc-500'/>
            <p><span className='italic'>Type:</span> {carDetail.type}</p>
          </div>
          <div className='flex items-center gap-2 mb-2'>
            <FaGear size={"1.2em"} className='text-zinc-500'/>
            <p><span className='italic'>Transmission:</span> {carDetail.transmission}</p>
          </div>
          <div className='flex items-center gap-2 mb-2'>
            <MdAirlineSeatReclineExtra size={"1.2em"} className='text-zinc-500'/>
            <p><span className='italic'>Seats:</span> {carDetail.seats}</p>
          </div>
          <div className='flex items-center gap-2 mb-2'>
            <FaMoneyBill size={"1.2em"} className='text-zinc-500'/>
            <p><span className='italic'>Price:</span> {carDetail.pricePerDay} AED/Day</p>
          </div>
          <div className='flex items-center gap-2 mb-7'>
            <TiTick size={"1.2em"} className='text-zinc-500'/>
            <p className='italic'>Availability: </p>
            {(carDetail.available) ? <p className="text-green-600">Available</p> :
            <p className="text-red-600">Not Available</p>}
          </div>
          <p className='italic mb-1'>Description</p>
          <p>Experience comfort, performance, and reliability with this well-maintained vehicle, perfect for every journey. Whether you're planning a weekend getaway, a business trip, or simply need a dependable car for daily travel, this vehicle offers a smooth and enjoyable driving experience. Featuring a spacious interior, modern technology, excellent fuel efficiency, and advanced safety features, it is designed to make every trip comfortable and stress-free. The car is regularly serviced and thoroughly cleaned before every rental, ensuring it arrives in excellent condition. Book today and enjoy flexible rental options, competitive pricing, and a vehicle you can trust for every mile.
          </p>
          <button className='bg-black text-white rounded-md px-3 py-1 hover:cursor-pointer mt-7'><p>Book this car</p></button>
        </div>
      </div>}
    </div>
  )
}

export default CarDetailPage
