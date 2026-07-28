import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FaCar } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { TiTick } from "react-icons/ti";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import Confirmation from './Confirmation';
import DateSelection from './DateSelection';
import DriverDetails from './DriverDetails';
import { MdOutlineHorizontalRule } from "react-icons/md";
import AuthenticationContext from '../../context/auth';
import BookingsContext from '../../context/bookings';
import { formatDate } from '../../helpers/dateFormatting';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const { logInData } = useContext(AuthenticationContext)
  const { handleAddToBookings } = useContext(BookingsContext)

  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [carDetail, setCarDetail] = useState(null)
  const { carid } = useParams()
  let id = Number(carid)
  const [wizardStepNumber, setWizardStepNumber] = useState(1)
  
  // Booking Details
  // Dates
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)
  // Driver Info
  const [driverInformation, setDriverInformation] = useState({name: logInData.name});

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

  const handleConfirmBooking = () => {
    const booking = { carId: id, startDate: formatDate(startDate), endDate: formatDate(endDate), driver: driverInformation}
    handleAddToBookings(booking)
    navigate('/myBookings')
  }

  if (!logInData.isLoggedIn) {
    navigate('/login')
  }

  return (
    <div className='mt-32 mx-40'>
      {loading && !error && <div>Loading</div>}
      {error && 
        <div className='flex flex-col items-center gap-2'>
          <GoAlertFill size={"1.75em"} />
          <p className='text-center'>{error.message}</p>
        </div>}
      {!loading && !error && 
      <div className='flex w-full gap-10'>
        <div className='w-1/2 flex md:mt-18 flex-col gap-5 md:gap-10'>
          <div className="h-40 w-96 mb-3 flex items-center justify-center overflow-hidden">
            <img src={carDetail.image} alt="Car" className="object-cover w-full h-full" />
          </div>
          <div className='w-1/2'>
            <div className='flex items-end justify-between mb-2 pb-2'>
              <h1 className='text-2xl font-bold'>{carDetail.name}</h1>
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
          </div>
        </div>
        <div className='w-full'>
          <div className='w-full mb-4 border-b-2 border-solid border-gray-200 pb-2 flex justify-between items-center'>
            <h1 className='text-4xl font-bold italic'>Booking</h1>
            <div className='flex items-center'>
              <div className={`px-3 py-1 rounded-3xl ${wizardStepNumber === 1 ? 'bg-sky-400 text-white': 'bg-sky-200'}`}>1</div>
              <div><MdOutlineHorizontalRule className='text-sky-200' size={'1.5rem'}/></div>
              <div className={`px-3 py-1 rounded-3xl ${wizardStepNumber === 2 ? 'bg-sky-400 text-white': 'bg-sky-200'}`}>2</div>
              <div><MdOutlineHorizontalRule className='text-sky-200' size={'1.5rem' }/></div>
              <div className={`px-3 py-1 rounded-3xl ${wizardStepNumber === 3 ? 'bg-sky-400 text-white': 'bg-sky-200'}`}>3</div>
            </div>
          </div>
            {wizardStepNumber === 1 && 
              <DateSelection 
                carID={id}
                setWizardStepNumber={setWizardStepNumber} 
                startDate={startDate} 
                setStartDate={setStartDate} 
                endDate={endDate} 
                setEndDate={setEndDate}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                pricePerDay={carDetail.pricePerDay}
              />}
            {wizardStepNumber === 2 && 
              <DriverDetails 
                setWizardStepNumber={setWizardStepNumber}
                driverInformation={driverInformation}
                setDriverInformation={setDriverInformation}
              />}
            {wizardStepNumber === 3 && 
              <Confirmation 
                setWizardStepNumber={setWizardStepNumber}
                startDate={startDate}
                endDate={endDate}
                driverInformation={driverInformation}
                handleConfirmBooking={handleConfirmBooking}
              />}
        </div>
      </div>}
    </div>
  )
}

export default BookingPage
