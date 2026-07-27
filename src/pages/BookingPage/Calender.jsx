import { useState } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Calender = ({datesInMonthArray, setStartDate, startDate, setEndDate, endDate, month, year}) => {
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const monthText = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const firstDay = datesInMonthArray[0].getDay()
  const rangeFromFirstDay = Array.from({ length: firstDay }, (_, index) => index + 1)
  const [selectedDates, setSelectedDates] = useState([])

  const handleSelectDate = (date) => {
    if (!startDate) {
      setStartDate(date)
      setSelectedDates([date.getTime()])
    } else if (startDate && endDate) {
      setStartDate(date)
      setEndDate(null)
      setSelectedDates([date.getTime()])
    } else {
      setEndDate(date);
      setSelectedDates(getDatesInRange(startDate, date));
    }
  }

  const getDatesInRange = (start, end) => {
    const dates = [];
    const current = new Date(start);

    while (current <= end) {
      dates.push(current.getTime());
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  return (
    <div className="w-96">
      <div className="flex justify-around bg-black">
        <button><FaArrowLeft className="text-white"/></button>
        <p className="text-white">{monthText[month]}</p>
        <p className="text-white">{year}</p>
        <button><FaArrowRight className="text-white"/></button>
      </div>
      <div className="grid grid-cols-7 gap-x-1 gap-y-5">
        {daysOfWeek.map((day, index)=>{
          return <div className="text-center">{day}</div>
        })}
        {rangeFromFirstDay.map((number, index)=>{
          return <div key={index}></div>
        })}
        {datesInMonthArray.map((date, index) => {
          return (
            <button className={`${selectedDates.includes(date.getTime()) ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => handleSelectDate(date)} key={index}>{date.getDate()}</button>
        )})}
      </div>
    </div>
  )
}

export default Calender
