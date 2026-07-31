import { useEffect, useState, useContext } from "react"
import Calender from "./Calender"
import { FaArrowRight } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { formatDate, getDatesInRange } from "../../helpers/dateFormatting";
import BookingsContext from "../../context/bookings";

const DateSelection = ({carID, setWizardStepNumber,startDate, setStartDate, endDate, setEndDate, totalPrice, setTotalPrice, pricePerDay, selectedDates, setSelectedDates}) => {
  const { bookings } = useContext(BookingsContext)

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [datesInMonthArray, setDatesInMonthArray] = useState([])
  const [blockedDates, setBlockedDates] = useState([])
  const [error, setError] = useState(null)
  
  useEffect(()=>{
    setDatesInMonthArray(getAllDatesInMonth(year, month))
  }, [year, month])

  useEffect(()=>{
    const bookingsOfThisCar = bookings.filter((booking)=> booking.carId === carID)
    console.log(bookingsOfThisCar);
    

    let blockedDatesOfThisCar = [];
    bookingsOfThisCar.forEach((booking)=>{
      blockedDatesOfThisCar.push(...getDatesInRange(new Date(booking.startDate), new Date(booking.endDate)))
    })
    
    // Block past days of this month
    let yesterdayDate = new Date();
    yesterdayDate.setDate(today.getDate() - 1);
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    if (today.getDate() > 1) {
      blockedDatesOfThisCar.push(
        ...getDatesInRange(firstDayOfCurrentMonth, yesterdayDate)
      );
    }
    
    setBlockedDates(blockedDatesOfThisCar)

  }, [bookings])

  
  const getAllDatesInMonth = (year, month) => {
    const dates = [];
    const date = new Date(year, month, 1);
  
    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1); 
    }
    return dates;
  }

  const validateDatesAndNextHandler = () => {
    if (!startDate || !endDate) {
      setError("Please select the range of dates you want to book the car")
      return;
    } 
    if (!error) {
      setWizardStepNumber(2)
    }
  }

  return (
    <div className="flex gap-5 flex-col">
      <p>Select a range of dates you want to book your car:</p>
      <div className="flex flex-col items-center gap-10">
        <div className="flex justify-center">
          {datesInMonthArray.length > 0 && 
          <Calender 
            datesInMonthArray={datesInMonthArray} 
            startDate={startDate} 
            setStartDate={setStartDate} 
            setEndDate={setEndDate} 
            endDate={endDate} 
            month={month} 
            setMonth={setMonth}
            setYear={setYear}
            year={year}
            setTotalPrice={setTotalPrice}
            pricePerDay={pricePerDay}
            blockedDates={blockedDates}
            error={error}
            setError={setError}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />}
        </div>
        <div className="w-full">
          <div className="flex gap-3 w-full">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="">From:</label>
              <div type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1'>{formatDate(startDate)}</div>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="">To:</label>
              <div type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1'>{formatDate(endDate)}</div>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="">Price:</label>
              <div type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1'>AED {totalPrice}</div>
            </div>
          </div>
          {error && <div className="flex gap-2 items-center mt">
            <MdError className="text-red-600" />
            <p className="text-red-600">Error: {error}</p>
          </div>}
        </div>
      </div>
      <div className="flex items-end justify-end">
        <button onClick={validateDatesAndNextHandler} className='flex items-center gap-4 bg-black text-white rounded-md px-3 py-1 hover:cursor-pointer'>
          <p>Next</p>
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}

export default DateSelection
