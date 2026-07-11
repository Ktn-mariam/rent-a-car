import React, { useEffect, useState } from 'react'
import CarsPage from './pages/CarsPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CarDetailPage from './pages/CarDetailPage'
import Navbar from './components/Navbar'

const App = () => {
  const [favouriteCarIds, setFavouriteCarIds] = useState(JSON.parse(
  localStorage.getItem("favouriteCars")) || [])

  useEffect(()=>{
    console.log(favouriteCarIds);
    
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
        <Route path="/:carid" element={<CarDetailPage setFavouriteCarIds={setFavouriteCarIds} favouriteCarIds={favouriteCarIds}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
