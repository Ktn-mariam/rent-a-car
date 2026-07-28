
import { useContext, useEffect, useState } from "react"
import BookingsContext from "../../context/bookings"
import BookingCard from "../../components/BookingCard"

const MyBookingsPage = () => {
  const { bookings } = useContext(BookingsContext)
  const [pastBookings, setPastBookings] = useState(null)
  const [upcomingBookings, setUpcomingBookings] = useState(null)
  const [sideBarOption, setSideBarOption] = useState("Upcoming")

  useEffect(()=>{
    const pastBookingsFiltered = bookings.filter((booking)=> {
      const bookingEndDate = new Date(booking.endDate)
      const todayDate = new Date()
      return bookingEndDate < todayDate
    })

    const upcomingBookingsFiltered = bookings.filter((booking)=> {
      const bookingEndDate = new Date(booking.endDate)
      const todayDate = new Date()
      return bookingEndDate > todayDate
    })

    setPastBookings(pastBookingsFiltered)
    setUpcomingBookings(upcomingBookingsFiltered)
  }, [bookings])

  return (
    <div className="mb-14 ">
      <h1 className="sm:mx-20 mx-5 mb-10 font-bold text-xl italic">My Bookings</h1>
      <div className="flex sm:gap-10 gap-5 my-5 sm:mx-20 mx-5">
        <div className="flex flex-col sm:w-56 min-w-40 gap-3">
          <button className={`text-left px-5 py-2 rounded-md ${sideBarOption === "Upcoming"? 'bg-zinc-200' : 'bg-zinc-100'}`} onClick={()=> setSideBarOption("Upcoming")}>Upcoming</button>
          <button className={`text-left px-5 py-2 rounded-md ${sideBarOption === "Past"? 'bg-zinc-200' : 'bg-zinc-100'}`} onClick={()=> setSideBarOption("Past")}>Past</button>
        </div>
        <div className="flex flex-col flex-1 gap-20">
          {sideBarOption === "Upcoming" && upcomingBookings && upcomingBookings.map((booking, index)=>{
            return (
            <div key={index}>
              <h1 className="border-b-2 border-zinc-200 font-bold">Booking ID: {booking.id}</h1>
              <BookingCard startDate={booking.startDate} endDate={booking.endDate} driverInformation={booking.driver}/>
              <div className="flex justify-end mt-5">
                <button className="bg-black text-white rounded-md px-3 py-1 hover:cursor-pointer hover:bg-red-700">Cancel Booking</button>
              </div>
            </div>
          )})}
          {sideBarOption === "Past" && pastBookings && pastBookings.map((booking, index)=>{
            return (
            <div key={index}>
              <h1 className="border-b-2 border-zinc-200 font-bold">Booking ID: {booking.id}</h1>
              <BookingCard startDate={booking.startDate} endDate={booking.endDate} driverInformation={booking.driver}/>
            </div>
          )})}
        </div>
      </div>
    </div>
  )
}

export default MyBookingsPage
