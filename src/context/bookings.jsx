import React, { createContext, useEffect, useState, useContext } from 'react'
import ToastNotificationsContext from './toastNotifications'

const BookingsContext = createContext({
  bookings: [],
  setBookings: () =>{},
  handleAddToBookings: (booking) =>{},
  handleCancelBooking: (bookingId) =>{}
})

export const BookingsContextProvider = ({ children }) => {
  const [bookings, setBookings] = useState([])
  const { showToast } = useContext(ToastNotificationsContext)

  useEffect(()=>{
    const fetchBookings = async () => {
      const response = await fetch('/data/bookings.json');
      const bookings = await response.json();
      setBookings(bookings)
    }

    if (!localStorage.getItem("Bookings")) {
      fetchBookings()
    } else {
      setBookings(JSON.parse(localStorage.getItem("Bookings")))
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem(
      "Bookings",
      JSON.stringify(bookings)
    );
  }, [bookings])

  const handleAddToBookings = (booking) => {
    const maxId = Math.max(
      ...bookings.map(booking => Number(booking.id.slice(1)))
    );

    const BookingId = `b${maxId + 1}`
    setBookings((prevBookings) => {
      return [...prevBookings, {id: BookingId, ...booking}]
    })
    showToast(`Booking ${BookingId} added to My Booking`, "success")
  }

  const handleCancelBooking = (bookingId) => {
    const newBookings = bookings.filter((booking)=>{
      return booking.id !== bookingId
    })

    setBookings(newBookings)
    showToast(`Booking ${bookingId} has been canelled`, "success")
  }

  let contextValue = {
    bookings,
    setBookings,
    handleAddToBookings,
    handleCancelBooking
  }

  return (
    <BookingsContext.Provider value={contextValue}>
      {children}
    </BookingsContext.Provider>
  )
}

export default BookingsContext