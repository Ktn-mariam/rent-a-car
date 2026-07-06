import { useEffect, useState } from 'react'
import CarCard from './components/CarCard'

// To add
// Radio button options for Transmission (Automatic / Manual / All), Type (Economy / Sedan/ SUV / Luxury / All),
// Drop down for Sort by price: Low→High and High→Low.
// Results counter: "Showing X of Y cars", updating live.
// Search box


function App() {
  const [cars, setCars] = useState([])

  useEffect(()=>{
    const fetchCars = async () => {
      const carsData = await fetch('/data/cars.json')
      const cars = await carsData.json()
      setCars(cars)
    }

    fetchCars()
  }, [])

  return (
    <div className='my-14 mx-20'>
      <h1 className="text-3xl font-bold text-center">
        RENT A CAR
      </h1>
      <div>
        <div className='my-5'>
          <input type="text" placeholder='Search...' className='border-2 border-gray-200 border-solid rounded-md px-3 py-2 w-3/4' />
        </div>
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-6'>
        {cars.map((car)=>{
          return <CarCard/>
        })}
      </div>
    </div>
  )
}

export default App
