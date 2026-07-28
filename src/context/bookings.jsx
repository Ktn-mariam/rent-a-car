import React, { createContext, useEffect, useState } from 'react'

const BookingsContext = createContext({
  bookings: [],
  setBookings: () =>{},
  handleAddToBookings: (booking) =>{}
})

export const BookingsContextProvider = ({ children }) => {
  const [bookings, setBookings] = useState([])

  useEffect(()=>{
    const fetchBookings = async () => {
      const response = await fetch('/data/bookings.json');
      const bookings = await response.json();
      setBookings(bookings)
    }

    fetchBookings()
  }, [])

  const handleAddToBookings = (booking) => {
    const BookingId = `b${bookings.length + 1}`
    setBookings((prevBookings) => {
      return [...prevBookings, {id: BookingId, ...booking}]
    })
  }

  let contextValue = {
    bookings,
    setBookings,
    handleAddToBookings
  }

  return (
    <BookingsContext.Provider value={contextValue}>
      {children}
    </BookingsContext.Provider>
  )
}

export default BookingsContext