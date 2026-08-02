
import { useContext, useEffect, useState } from "react"
import BookingsContext from "../../context/bookings"
import BookingCard from "../../components/BookingCard"
import AuthenticationContext from "../../context/auth"
import { useNavigate } from "react-router-dom"
import Modal from "../../components/Modal"
import { GoAlertFill } from "react-icons/go";
import ToastNotificationsContext from "../../context/toastNotifications"

const MyBookingsPage = () => {
  const { bookings, setBookings, handleCancelBooking } = useContext(BookingsContext)
  const { logInData } = useContext(AuthenticationContext)
  const { showToast } = useContext(ToastNotificationsContext)
  
  const [pastBookings, setPastBookings] = useState(null)
  const [upcomingBookings, setUpcomingBookings] = useState(null)
  const [sideBarOption, setSideBarOption] = useState("Upcoming")
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const navigate = useNavigate()

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

  if (!logInData.isLoggedIn) {
    navigate("/login")
    showToast("Please sign up/log in to book a car", "error")
  }

  return (
    <div className="mb-14 ">
      <Modal isOpen={bookingToCancel !== null} setIsOpen={() => setBookingToCancel(null)}>
        <div className="flex items-center flex-col gap-2">
          <GoAlertFill className="text-red-600" size={'1.5rem'}/>
          <p className="text-red-600">Are you sure you want to delete booking No. {bookingToCancel?.id}?</p>
          <div className="flex gap-2 mt-7">
            <button onClick={() => setBookingToCancel(null)} className="bg-zinc-300 rounded-md px-3 py-1 hover:cursor-pointer">Cancel</button>
            <button onClick={() => {
              handleCancelBooking(bookingToCancel?.id);
              setBookingToCancel(null);
            }} 
              className="bg-black text-white rounded-md px-3 py-1 hover:cursor-pointer">Confirm</button>
          </div>
        </div>
      </Modal>
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
                <button onClick={() => setBookingToCancel(booking)} className="bg-black text-white rounded-md px-3 py-1 hover:cursor-pointer hover:bg-red-700">Cancel Booking</button>
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
