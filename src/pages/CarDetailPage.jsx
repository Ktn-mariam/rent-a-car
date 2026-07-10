import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCar } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";

const CarDetailPage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [carDetail, setCarDetail] = useState(null)
  const { carid } = useParams()
  console.log(carid);
  

  useEffect(() => {
      const fetchCars = async () => {
        try {
          const carsData = await fetch('/data/cars.json')
          const cars = await carsData.json()
          const car = cars.filter((car) => car.id === Number(carid))
          if (car.length === 0) {
            throw new Error(`Car with id: ${carid} does not exist`)
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
      {!loading && !error && 
      <div className='w-full flex md:mt-18 md:flex-row flex-col gap-5 md:gap-10 md:items-center'>
        <div className='md:w-1/2 w-full'>
          <div className="w-full mb-3 flex items-center justify-center overflow-hidden">
            <img src={carDetail.image} alt="Car" className="object-cover w-full h-full" />
          </div>
        </div>
        <div className='md:w-1/2 w-full'>
          <div className='flex items-end justify-between mb-7 border-b-2 border-solid border-gray-200'>
            <h1 className='text-4xl font-bold italic'>{carDetail.name}</h1>
            {(carDetail.available) ? <p className="italic text-green-600 text-lg font-semibold">Available</p> :
            <p className="italic text-red-600 text-lg font-semibold">Not Available</p>}
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
          <div className='flex items-center gap-2 mb-7'>
            <FaMoneyBill size={"1.2em"} className='text-zinc-500'/>
            <p><span className='italic'>Price:</span> {carDetail.pricePerDay} AED/Day</p>
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
