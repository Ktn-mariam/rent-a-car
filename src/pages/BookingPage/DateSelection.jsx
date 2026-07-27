import { useEffect, useState } from "react"
import Calender from "./Calender"
import { FaArrowRight } from "react-icons/fa";


const DateSelection = ({setWizardStepNumber}) => {
  const today = new Date();

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [datesInMonthArray, setDatesInMonthArray] = useState([])
  
  useEffect(()=>{
    setDatesInMonthArray(getAllDatesInMonth(year, month))
  }, [year, month])
  
  const getAllDatesInMonth = (year, month) => {
    const dates = [];
    const date = new Date(year, month, 1);
  
    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1); 
    }
    return dates;
  }

  const formatDate = (date) => {
    if (!date) {
      return 'YYYY-MM-DD'
    }
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    return formattedDate
  }

  return (
    <div className="flex gap-5 flex-col">
      <p>Select a range of dates you want to book your car:</p>
      <div className="flex flex-col items-center gap-10">
        <div className="flex justify-center">
          {datesInMonthArray.length > 0 && <Calender datesInMonthArray={datesInMonthArray} startDate={startDate} setStartDate={setStartDate} setEndDate={setEndDate} endDate={endDate} month={month} year={year}/>}
        </div>
        <div className="flex gap-3 w-full">
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="">From:</label>
            <div type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1'>{formatDate(startDate)}</div>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="">To:</label>
            <div type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1'>{formatDate(startDate)}</div>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="">Price:</label>
            <div type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1'>AED 234</div>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end">
        <button onClick={()=> setWizardStepNumber(2)} className='flex items-center gap-4 bg-black text-white rounded-md px-3 py-1 hover:cursor-pointer'>
          <p>Next</p>
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}

export default DateSelection
