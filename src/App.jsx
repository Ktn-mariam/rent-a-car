import { useEffect, useState } from 'react'
import CarCard from './components/CarCard'
import { GrPowerReset } from "react-icons/gr";
import { GoAlertFill } from "react-icons/go";
import { useSearchParams } from 'react-router-dom';
import Sort from './components/Sort';
import TransmissionFilter from './components/TransmissionFilter';
import TypeFilter from './components/TypeFilter';

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
            <TransmissionFilter transmission={transmission} handleTransmissionChange={handleTransmissionChange} />
            <TypeFilter type={type} handleTypeChange={handleTypeChange}/>
          </div>
        </div>
        <div className='w-full'>
          <div>
            <div className='flex gap-3 items-center justify-between'>
              <div className='w-full'>
                <input type="text" placeholder='Search...' className='border-2 border-gray-200 border-solid rounded-md px-2 py-1 w-full' />
              </div>
              <Sort sortByPrice={sortByPrice} handleSortChange={handleSortChange}/>
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
