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
      <div className='flex gap-10 my-5'>
        <div className='w-40'>
          <h2 className='text-xl font-bold'>Filters</h2>
          <div className='flex flex-col gap-5 py-3'>
            <div>
              <h4 className='border-b-2 border-solid border-gray-200 mb-2 font-semibold'>Transmission</h4>
              <div>
                <div className='flex gap-1 items-center'>
                  <input type="radio" name="transmission" id="All" value="All" />
                  <label htmlFor="All">All</label>
                </div>
                <div className='flex gap-1 items-center'>
                  <input type="radio" name="transmission" id="Automatic" value="Automatic" />
                  <label htmlFor="Automatic">Automatic</label>
                </div>
                <div className='flex gap-1 items-center'>
                  <input type="radio" name="transmission" id="Manual" value="Manual" />
                  <label htmlFor="Manual">Manual</label>
                </div>
              </div>
            </div>
            <div>
              <h4 className='border-b-2 border-solid border-gray-200 mb-2 font-semibold'>Type</h4>
              <div>
                <div className='flex gap-1 items-center'>
                  <input type="radio" name="Type" id="All" value="All" />
                  <label htmlFor="All">All</label>
                </div>
                <div className='flex gap-1 items-center'>
                  <input type="radio" name="Type" id="Economy" value="Economy" />
                  <label htmlFor="Economy">Economy</label>
                </div>
                <div className='flex gap-1 items-center'>
                  <input type="radio" name="Type" id="Sedan" value="Sedan" />
                  <label htmlFor="Sedan">Sedan</label>
                </div>
                <div className='flex gap-1 items-center'>
                  <input type="radio" name="Type" id="SUV" value="SUV" />
                  <label htmlFor="SUV">SUV</label>
                </div>
                <div className='flex gap-1 items-center'>
                  <input type="radio" name="Type" id="Luxury" value="Luxury" />
                  <label htmlFor="Luxury">Luxury</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <input type="text" placeholder='Search...' className='border-2 border-gray-200 border-solid rounded-md px-3 py-2 w-3/4' />
            </div>
          </div>
          <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-6'>
            {cars.map((car)=>{
              return <CarCard car={car} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
