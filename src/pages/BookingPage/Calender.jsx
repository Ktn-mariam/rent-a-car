import { useContext } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { formatDate, getDatesInRange } from "../../helpers/dateFormatting";
import ToastNotificationsContext from "../../context/toastNotifications";

const Calender = ({datesInMonthArray, setStartDate, startDate, setEndDate, endDate, month, setMonth, year, setYear, setTotalPrice, pricePerDay, blockedDates, error, setError,selectedDates, setSelectedDates}) => {
  const { showToast } = useContext(ToastNotificationsContext)

  const now = new Date();
  const currentMonth = now.getMonth(); // Returns 1-12
  const currentYear = now.getFullYear();

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const monthText = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const firstDay = datesInMonthArray[0].getDay()
  const rangeFromFirstDay = Array.from({ length: firstDay }, (_, index) => index + 1)

  const handleSelectDate = (date) => {
    if (!startDate) {
      setStartDate(date)
      setTotalPrice(0)
      setSelectedDates([formatDate(date)])
      setError(null)
    } else if (startDate && endDate) {
      setStartDate(date)
      setEndDate(null)
      setError(null)
      setTotalPrice(0)
      setSelectedDates([formatDate(date)])
    } else {
      setEndDate(date);
      setError(null)
      if (date < startDate) {
        setError("Please select valid range of dates. End date cannot be before the start date")
        return;
      }
      const rangeOfDates = getDatesInRange(startDate, date)
      setSelectedDates(rangeOfDates);
      setTotalPrice(pricePerDay * rangeOfDates.length)
    }
  }

  const handleBackInCalender = () => {
    if (month === currentMonth && year === currentYear) {
      showToast("Cannot select dates that have already passed.", "alert")
      return;
    }

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
    setError(null)
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
