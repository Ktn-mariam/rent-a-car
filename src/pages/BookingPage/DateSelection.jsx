import { useEffect, useState } from "react"
import Calender from "./Calender"


const DateSelection = () => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [month, setMonth] = useState(6)
  const [date, setDate] = useState(null)
  const [year, setYear] = useState(2026)
  const [datesInMonthArray, setDatesInMonthArray] = useState([])
  
  useEffect(()=>{
    setDatesInMonthArray(getAllDatesInMonth(year, month))
  }, [year, month])
  
  const getAllDatesInMonth = (year, month) => {
    const dates = [];
    const date = new Date(year, month, 1);
  
    while (date.getMonth() === month) {
      dates.push(new Date(date)); // Clone the date object
      date.setDate(date.getDate() + 1); // Move to the next day
    }
    return dates;
  }

  return (
    <div className="w-full">
      {datesInMonthArray.length > 0 && <Calender datesInMonthArray={datesInMonthArray}/>}
    </div>
  )
}

export default DateSelection
