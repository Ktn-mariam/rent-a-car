import { useEffect } from "react"


const Calender = ({datesInMonthArray}) => {
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const firstDay = datesInMonthArray[0].getDay()
  const rangeFromFirstDay = Array.from({ length: firstDay }, (_, index) => index + 1)

  useEffect(()=>{

  }, [])

  return (
    <div className="grid grid-cols-7 gap-20 items-center justify-center">
      {daysOfWeek.map((day, index)=>{
        return <div>{day}</div>
      })}
      {rangeFromFirstDay.map((number, index)=>{
        return <div key={index}></div>
      })}
      {datesInMonthArray.map((date, index) => {return (
        <button key={index}>{date.getDate()}</button>
      )})}
    </div>
  )
}

export default Calender
