import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import CarCard from './components/CarCard'
import Sort from './components/Sort';
import TypeFilter from './components/TypeFilter';
import TransmissionFilter from './components/TransmissionFilter';
import { GrPowerReset } from "react-icons/gr";
import { GoAlertFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscErrorCompact } from "react-icons/vsc";

function App() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
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

  const navigate = useNavigate();

  useEffect(()=>{
    const fetchCars = async () => {
      try {
        const carsData = await fetch('/data/cars.json')
        const cars = await carsData.json()
        throw new Error("API not working"); 
        setTotalCountOfCars(cars.length)
        setCars(cars)
        setFilteredCars(cars)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
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
  
  const handleSearchTextChange = (event) => {
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
    });
  };

  return (
    <div className='mb-14'>
      <div className='flex justify-between items-center mb-5 pb-7 pt-7 bg-black px-20'>
        <h1 className="text-4xl font-bold text-center text-white">
          Car Rental Platform
        </h1>
        <div className='flex items-center justify-center gap-2'>
          <button className='flex items-center gap-1 text-white  hover:bg-zinc-800 px-3 py-2 rounded-md' onClick={()=>{window.history.back()}}>
            <FaArrowLeft color='white' />
            Back
          </button>
          <button className='flex items-center gap-1 text-white hover:bg-zinc-800 px-3 py-2 rounded-md' onClick={()=>{window.history.forward()}}>
            <FaArrowRight color='white'/>
            Forward
          </button>
        </div>
      </div>
      <div className='flex gap-10 my-5 mx-20'>
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
            {!loading && !error && <div className='mt-1 mb-4'>
              <p className='italic'>Showing: <span className='font-semibold'>{FilteredCountOfCars} of {TotalCountOfCars} cars</span></p>
            </div>}
          </div>
          {loading && !error && <p className='text-center mt-5'>Loading data...</p>}
          {error && (
            <div className='flex flex-col items-center gap-2 justify-center mt-10'>
              <VscErrorCompact />
              <p className='text-center'>Error loading data: {error.message}</p>
            </div>
          )}
          {(filteredCars.length > 0) && (
            <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-8 gap-x-10'>
              {filteredCars.map((car, index)=>{
                return <CarCard car={car} key={index} />
              })}
            </div>
          )}
          {(!loading && !error && filteredCars.length === 0) && (
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
