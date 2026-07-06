import { useEffect, useState } from 'react'
import CarCard from './components/CarCard'
import { GrPowerReset } from "react-icons/gr";
import { GoAlertFill } from "react-icons/go";
import { useSearchParams } from 'react-router-dom';

// To add
// Radio button options for Transmission (Automatic / Manual / All), Type (Economy / Sedan/ SUV / Luxury / All),
// Drop down for Sort by price: Low→High and High→Low.
// Results counter: "Showing X of Y cars", updating live.
// Search box
// Reset Filter Button

function App() {
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [TotalCountOfCars, setTotalCountOfCars] = useState(0)

  const [searchParams, setSearchParams] = useSearchParams();

  const transmission = searchParams.get('transmission') || 'All';
  const type = searchParams.get('type') || 'All';
  const sortByPrice = searchParams.get('sort') || 'Default';

  const [FilteredCountOfCars, setFilteredCountOfCars] = useState(0)  
  
  useEffect(()=>{
    const fetchCars = async () => {
      const carsData = await fetch('/data/cars.json')
      const cars = await carsData.json()
      setTotalCountOfCars(cars.length)
      setCars(cars)
      setFilteredCars(cars)
    }

    fetchCars()
  }, [])

  useEffect(()=>{
    let filteredCars = cars;

    // filtering logic based on transmission and type
    if (transmission !== "All") {
      filteredCars = cars.filter((car) => car.transmission === transmission)
    }
    if (type !== "All") {
      filteredCars = filteredCars.filter((car) => car.type === type)
    }

    // Sorting logic based on price
    if (sortByPrice === "Low") {
      filteredCars = filteredCars.sort((a,b) => a.pricePerDay - b.pricePerDay)
    } else if (sortByPrice === "High") {
      filteredCars = filteredCars.sort((a, b) => b.pricePerDay - a.pricePerDay)
    }

    setFilteredCountOfCars(filteredCars.length);
    setFilteredCars([...filteredCars])
  }, [transmission, type, sortByPrice, cars])

  const handleTransmissionChange = (event) => {
    const value = event.target.value;
    if (value === "All") {
      handleParamChange("transmission", null)
      return
    }
    handleParamChange("transmission", value)
  };
  
  const handleTypeChange = (event) => {
    const value = event.target.value;
    if (value === "All") {
      handleParamChange("type", null)
      return
    }
    handleParamChange("type", value)
  };
  
  const handleSortChange = (event) => {
    const value = event.target.value;
    if (value === "Default") {
      handleParamChange("sort", null)
      return
    }
    handleParamChange("sort", value)
  }

  const handleResetFilters = () => {
    setSearchParams({});
  }

  const handleParamChange = (key, value) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      
      return newParams;
    }, { replace: true });
  };

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
                  <input type="radio" name="transmission" id="All" value="All" checked={transmission === 'All'} onChange={handleTransmissionChange}/>
                  <label htmlFor="All">All</label>
                </div>
                <div className='flex gap-1 items-center'>
                  <input type="radio" name="transmission" id="Automatic" value="Automatic" checked={transmission === 'Automatic'} onChange={handleTransmissionChange}/>
                  <label htmlFor="Automatic">Automatic</label>
                </div>
                <div className='flex gap-1 items-center'>
                  <input type="radio" name="transmission" id="Manual" value="Manual" checked={transmission === 'Manual'} onChange={handleTransmissionChange}/>
                  <label htmlFor="Manual">Manual</label>
                </div>
              </div>
            </div>
            <div>
              <h4 className='border-b-2 border-solid border-gray-200 mb-2 font-semibold'>Type</h4>
              <div>
                <div className='flex gap-1 items-center'>
                  <input type="radio" name="Type" id="All" value="All" checked={type === 'All'} onChange={handleTypeChange}/>
                  <label htmlFor="All">All</label>
                </div>
                <div className='flex gap-1 items-center'>
                  <input type="radio" name="Type" id="Economy" value="Economy" checked={type === 'Economy'} onChange={handleTypeChange}/>
                  <label htmlFor="Economy">Economy</label>
                </div>
                <div className='flex gap-1 items-center'>
                  <input type="radio" name="Type" id="Sedan" value="Sedan" checked={type === 'Sedan'} onChange={handleTypeChange}/>
                  <label htmlFor="Sedan">Sedan</label>
                </div>
                <div className='flex gap-1 items-center'>
                  <input type="radio" name="Type" id="SUV" value="SUV" checked={type === 'SUV'} onChange={handleTypeChange}/>
                  <label htmlFor="SUV">SUV</label>
                </div>
                <div className='flex gap-1 items-center'>
                  <input type="radio" name="Type" id="Luxury" value="Luxury" checked={type === 'Luxury'} onChange={handleTypeChange}/>
                  <label htmlFor="Luxury">Luxury</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <div>
            <div className='flex gap-3 items-center justify-between'>
              <div className='w-full'>
                <input type="text" placeholder='Search...' className='border-2 border-gray-200 border-solid rounded-md px-2 py-1 w-full' />
              </div>
              <div>
                <select name="cars" id="Sorting" className='border-2 border-gray-200 border-solid rounded-md px-2 py-1 w-40' value={sortByPrice} onChange={handleSortChange}>
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
          {(filteredCars.length > 0) ?(
            <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-10 gap-x-10'>
              {filteredCars.map((car, index)=>{
                return <CarCard car={car} key={index} />
              })}
            </div>
          ) : (
            <div className='flex flex-col items-center gap-5'>
              <div className='flex flex-col items-center gap-1'>
                <GoAlertFill size={"1.75em"}/>
                <p className='text-center'>No cars to display for the filters selected. Would you like to reset the filters?</p>
              </div>
              <button className='bg-black text-white rounded-md px-3 py-1 flex gap-2 items-center hover:cursor-pointer' onClick={handleResetFilters}><GrPowerReset /><p>Reset Filters</p></button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
