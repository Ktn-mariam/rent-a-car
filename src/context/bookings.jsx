import React, { createContext, useEffect, useState } from 'react'

const BookingsContext = createContext({
  bookings: [],
  setBookings: () =>{}
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


  let contextValue = {
    bookings,
    setBookings
  }

  return (
    <BookingsContext.Provider value={contextValue}>
      {children}
    </BookingsContext.Provider>
  )
}

export default BookingsContext