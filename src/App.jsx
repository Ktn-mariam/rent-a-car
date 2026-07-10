import React from 'react'
import CarsPage from './pages/CarsPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CarDetailPage from './pages/CarDetailPage'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<CarsPage />} />
        <Route path="/:carid" element={<CarDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
