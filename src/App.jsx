import React, { useEffect, useState } from 'react'
import CarsPage from './pages/CarsPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CarDetailPage from './pages/CarDetailPage'
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LogInPage'

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
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<CarsPage setFavouriteCarIds={setFavouriteCarIds} favouriteCarIds={favouriteCarIds}/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/:carid" element={<CarDetailPage setFavouriteCarIds={setFavouriteCarIds} favouriteCarIds={favouriteCarIds}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
