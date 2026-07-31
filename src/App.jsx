import React, { useEffect, useState } from 'react'
import CarsPage from './pages/CarsPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CarDetailPage from './pages/CarDetailPage'
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LogInPage'
import { AuthenticationContextProvider } from './context/auth'
import { BookingsContextProvider } from './context/bookings'
import BookingPage from './pages/BookingPage'
import MyBookingsPage from './pages/MyBookingsPage'
import { ToastNotificationsContextProvider } from './context/toastNotifications'

const App = () => {
  const [favouriteCarIds, setFavouriteCarIds] = useState(JSON.parse(
  localStorage.getItem("favouriteCars")) || [])

  useEffect(()=>{    
    localStorage.setItem(
      "favouriteCars",
      JSON.stringify(favouriteCarIds)
    );
  }, [favouriteCarIds])
  
  return (
    <ToastNotificationsContextProvider>
      <AuthenticationContextProvider>
        <BookingsContextProvider>
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path="/" element={<CarsPage setFavouriteCarIds={setFavouriteCarIds} favouriteCarIds={favouriteCarIds}/>}/>
              <Route path="/signup" element={<SignUpPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/cars/:carid" element={<CarDetailPage setFavouriteCarIds={setFavouriteCarIds} favouriteCarIds={favouriteCarIds}/>}/>
              <Route path="/cars/:carid/booking" element={<BookingPage/>}/>
              <Route path="/myBookings" element={<MyBookingsPage/>}/>
            </Routes>
          </BrowserRouter>
        </BookingsContextProvider>
      </AuthenticationContextProvider>
    </ToastNotificationsContextProvider>
  )
}

export default App
