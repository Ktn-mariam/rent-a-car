import { useEffect, useState } from 'react'
import CarCard from './components/CarCard'
import { GrPowerReset } from "react-icons/gr";
import { GoAlertFill } from "react-icons/go";
import { useSearchParams } from 'react-router-dom';
import Sort from './components/Sort';
import TransmissionFilter from './components/TransmissionFilter';
import TypeFilter from './components/TypeFilter';
import { IoIosSearch } from "react-icons/io";

function App() {
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [TotalCountOfCars, setTotalCountOfCars] = useState(0)
  const [FilteredCountOfCars, setFilteredCountOfCars] = useState(0)
  const [debouncedSearchText, setDebouncedSearchText] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const transmission = searchParams.get('transmission') || 'All';
  const type = searchParams.get('type') || 'All';
  const sortByPrice = searchParams.get('sort') || 'Default';
  const availability = searchParams.get('availability') || 'False';
  const searchText = searchParams.get('search') || '';

  
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

  useEffect(() => {
    const timer = setTimeout(()=>{
      setDebouncedSearchText(searchText)
    }, 300)

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(()=>{
    let filteredCars = cars;

    // filtering logic based on transmission and type
    if (transmission !== "All") {
      filteredCars = cars.filter((car) => car.transmission === transmission)
    }
    if (type !== "All") {
      filteredCars = filteredCars.filter((car) => car.type === type)
    }

    if (availability === "True") {
      filteredCars = filteredCars.filter((car) => car.available === true)
    }

    // Sorting logic based on price
    if (sortByPrice === "Low") {
      filteredCars = filteredCars.sort((a,b) => a.pricePerDay - b.pricePerDay)
    } else if (sortByPrice === "High") {
      filteredCars = filteredCars.sort((a, b) => b.pricePerDay - a.pricePerDay)
    }

    // Search filter
    if (debouncedSearchText) {
      filteredCars = filteredCars.filter((car)=>{
        return car.name.toLowerCase().includes(debouncedSearchText.trim().toLowerCase())
      })
    }

    setFilteredCountOfCars(filteredCars.length);
    setFilteredCars([...filteredCars])
  }, [transmission, type, sortByPrice, cars, availability, debouncedSearchText])

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
  
  const handleAvailabilityChange = () => {
    if (availability === "True") {
      handleParamChange("availability", null)
      return
    }
    handleParamChange("availability", "True")
  }
  
  const handleResetFilters = () => {
    setSearchParams({});
  }
  
  const handleSearchTextChange = () => {
    const value = event.target.value;
    if (value.length === 0) {
      handleParamChange("search", null)
      return
    }

    handleParamChange("search", value)
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
        <div className='w-56'>
          <h2 className='text-xl font-bold'>Filters</h2>
          <div className='flex flex-col gap-5 py-3'>
            <TransmissionFilter transmission={transmission} handleTransmissionChange={handleTransmissionChange} />
            <TypeFilter type={type} handleTypeChange={handleTypeChange}/>
            <div>
              <h4 className='border-b-2 border-solid border-gray-200 mb-2 font-semibold'>Availability</h4>
              <div className='flex gap-2 items-center'>
                <button
                  onClick={handleAvailabilityChange}
                  className={`w-8 h-4 flex items-center rounded-full p-0.5 transition-colors ${
                    availability === "True" ? "bg-black" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-3 h-3 bg-white rounded-full transition-transform ${
                      availability === "True" ? "translate-x-4" : ""
                    }`}
                    />
                </button>
                <p>Available Only</p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <div>
            <div className='flex gap-3 items-center justify-between'>
              <div className='w-full'>
                <div className='flex items-center gap-2 border-2 border-gray-200 border-solid rounded-md px-2 py-1 w-full focus-within:border-gray-300 transition-colors'>
                <IoIosSearch size={"1.5em"} color="lightgray" />
                <input type="text" defaultValue={searchText} placeholder='Search...' className='border-none focus:outline-none' onChange={handleSearchTextChange}></input>
                </div>
              </div>
              <Sort sortByPrice={sortByPrice} handleSortChange={handleSortChange}/>
            </div>
            <div className='mt-1 mb-4'>
              <p className='italic'>Showing: <span className='font-semibold'>{FilteredCountOfCars} of {TotalCountOfCars} cars</span></p>
            </div>
          </div>
          {(filteredCars.length > 0) ?(
            <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-8 gap-x-10'>
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
