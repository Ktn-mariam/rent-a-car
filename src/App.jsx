import { useEffect, useState } from 'react'
import CarCard from './components/CarCard'

// To add
// Radio button options for Transmission (Automatic / Manual / All), Type (Economy / Sedan/ SUV / Luxury / All),
// Drop down for Sort by price: Low→High and High→Low.
// Results counter: "Showing X of Y cars", updating live.
// Search box


function App() {
  const [cars, setCars] = useState([])
  const [TotalCountOfCars, setTotalCountOfCars] = useState(0)
  const [FilteredCountOfCars, setFilteredCountOfCars] = useState(0)

  useEffect(()=>{
    const fetchCars = async () => {
      const carsData = await fetch('/data/cars.json')
      const cars = await carsData.json()
      setTotalCountOfCars(cars.length)
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
            <div className='flex gap-3 items-center justify-between'>
              <div className='w-3/4'>
                <input type="text" placeholder='Search...' className='border-2 border-gray-200 border-solid rounded-md px-2 py-1 w-full' />
              </div>
              <div>
                <select name="cars" id="Sorting" className='border-2 border-gray-200 border-solid rounded-md px-2 py-1 w-40'>
                  <option value="Default">Sort By Price</option>
                  <option value="High">High to Low</option>
                  <option value="Low">Low to High</option>
                </select>
              </div>
            </div>
            <div className='mt-1 mb-4'>
              <p className='italic'>Showing: <span className='font-semibold'>{FilteredCountOfCars} of {TotalCountOfCars} cars</span></p>
            </div>
          </div>
          <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-10 gap-x-10'>
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
