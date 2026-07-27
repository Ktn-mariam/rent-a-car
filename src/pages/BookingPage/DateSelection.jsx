import { useEffect, useState } from "react"
import Calender from "./Calender"


const DateSelection = () => {
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
      <div className="flex mb-40 items-center gap-10">
        <div className="flex justify-center w-1/2">
          {datesInMonthArray.length > 0 && <Calender datesInMonthArray={datesInMonthArray} startDate={startDate} setStartDate={setStartDate} setEndDate={setEndDate} endDate={endDate}/>}
        </div>
        <div className="flex gap-10 w-1/2">
          <div>From: <span>{formatDate(startDate)}</span></div>
          <div>To: <span>{formatDate(endDate)}</span></div>
        </div>
      </div>
    </div>
  )
}

export default DateSelection
