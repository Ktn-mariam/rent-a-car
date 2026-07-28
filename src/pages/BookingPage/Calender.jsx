import { useState } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { formatDate, getDatesInRange } from "../../helpers/dateFormatting";

const Calender = ({datesInMonthArray, setStartDate, startDate, setEndDate, endDate, month, setMonth, year, setYear, setTotalPrice, pricePerDay, blockedDates}) => {
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const monthText = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const firstDay = datesInMonthArray[0].getDay()
  const rangeFromFirstDay = Array.from({ length: firstDay }, (_, index) => index + 1)
  const [selectedDates, setSelectedDates] = useState([])

  const handleSelectDate = (date) => {
    if (!startDate) {
      setStartDate(date)
      setTotalPrice(0)
      setSelectedDates([formatDate(date)])
    } else if (startDate && endDate) {
      setStartDate(date)
      setEndDate(null)
      setTotalPrice(0)
      setSelectedDates([formatDate(date)])
    } else {
      setEndDate(date);
      const rangeOfDates = getDatesInRange(startDate, date)
      setSelectedDates(rangeOfDates);
      setTotalPrice(pricePerDay * rangeOfDates.length)
    }
  }

  const handleBackInCalender = () => {
    let newMonth = month - 1;    
    let newYear = year;
    
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setMonth(newMonth)
    setYear(newYear)
  }

  const handleNextInCalender = () => {
    let newMonth = month + 1;    
    let newYear = year;

    if (newMonth === 12) {
      newMonth = 0;
      newYear++;
    }

    setMonth(newMonth)
    setYear(newYear)
  }

  const returnColorOfDate = (date) => {
    const dateString = formatDate(date);

    if (selectedDates.includes(dateString)) {
      return "bg-blue-500 text-white";
    } 
    
    if (blockedDates.includes(dateString)) {
      return "bg-zinc-300";
    }

    return "bg-white";
  };

  return (
    <div className="w-96">
      <div className="flex justify-around bg-black">
        <button onClick={handleBackInCalender}><FaArrowLeft className="text-white"/></button>
        <p className="text-white">{monthText[month]}</p>
        <p className="text-white">{year}</p>
        <button onClick={handleNextInCalender}><FaArrowRight className="text-white"/></button>
      </div>
      <div className="grid grid-cols-7 gap-x-1 gap-y-5">
        {daysOfWeek.map((day, index)=>{
          return <div key={index} className="text-center">{day}</div>
        })}
        {rangeFromFirstDay.map((number, index)=>{
          return <div key={index}></div>
        })}
        {datesInMonthArray.map((date, index) => {
          return (
            <button className={returnColorOfDate(date)} onClick={() => handleSelectDate(date)} disabled={blockedDates.includes(formatDate(date))} key={index}>{date.getDate()}</button>
        )})}
      </div>
    </div>
  )
}

export default Calender
