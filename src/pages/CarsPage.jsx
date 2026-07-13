import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce'
import CarCard from '../components/CarCard'
import Sort from '../components/Sort';
import TypeFilter from '../components/TypeFilter';
import TransmissionFilter from '../components/TransmissionFilter';
import { GrPowerReset } from "react-icons/gr";
import { GoAlertFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscErrorCompact } from "react-icons/vsc";
import Navbar from '../components/Navbar';
import SeatFilter from '../components/SeatFilter';
import OtherFilters from '../components/OtherFilters';
import PriceRangeFilter from '../components/PriceRangeFilter';

function CarsPage({favouriteCarIds, setFavouriteCarIds}) {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filteredCars, setFilteredCars] = useState([])
  const [TotalCountOfCars, setTotalCountOfCars] = useState(0)
  const [FilteredCountOfCars, setFilteredCountOfCars] = useState(0)
  const [noOfPages, setNoOfPages] = useState(1)
  const [currentDisplayOfCars, setcurrentDisplayOfCars] = useState([])
  const [pagesArray, setPagesArray] = useState([])
  const carsPerPage = 8;

  const [searchParams, setSearchParams] = useSearchParams();

  const transmission = searchParams.get('transmission') || 'All';
  const type = searchParams.get("type") || 'All';
  const sort = searchParams.get('sort') || 'Default';
  const availability = searchParams.get('availability') || 'False';
  const favourites = searchParams.get('favourites') || 'False';
  const searchText = searchParams.get('search') || '';
  const seats = searchParams.get('seats') || 'All';
  const lowerPriceRange = searchParams.get('lowerPriceRange');
  const upperPriceRange = searchParams.get('upperPriceRange');
  const currentPage = searchParams.get('page') || '1';

  const debouncedSearchText = useDebounce(searchText, 300);
  const debouncedLowerPriceRange = useDebounce(lowerPriceRange, 500);
  const debouncedUpperPriceRange = useDebounce(upperPriceRange, 500);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await fetch('/data/cars.json')
        const cars = await carsData.json()
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
  }, [setLoading])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText)
    }, 300)

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    let filteredCars = cars;

    // filtering logic based on transmission and type
    if (transmission !== "All") {
      filteredCars = cars.filter((car) => car.transmission === transmission)
    }

    const types = type.split("OR")
    if (type !== "All") {
      filteredCars = filteredCars.filter((car) => types.includes(car.type))
    }

    if (availability === "True") {
      filteredCars = filteredCars.filter((car) => car.available === true)
    }

    // Sorting logic based on price
    if (sort === "Low") {
      filteredCars = filteredCars.sort((a, b) => a.pricePerDay - b.pricePerDay)
    } else if (sort === "High") {
      filteredCars = filteredCars.sort((a, b) => b.pricePerDay - a.pricePerDay)
    } else if (sort === "NameAtoZ") {
      filteredCars = filteredCars.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === "NameZtoA") {
      filteredCars = filteredCars.sort((a, b) => b.name.localeCompare(a.name))
    }

    // Seat filter
    if (seats === "1to3") {
      filteredCars = filteredCars.filter((car) => car.seats < 4)
    } else if (seats === "moreThan7") {
      filteredCars = filteredCars.filter((car)=> car.seats > 7)
    } else if (seats !== "All") {
      filteredCars = filteredCars.filter((car)=> car.seats === Number(seats))
    }

    // Price Lower Range
    if (debouncedLowerPriceRange) {
      filteredCars = filteredCars.filter((car) => car.pricePerDay >= debouncedLowerPriceRange)
    }

    // Price Upper Range
    if (debouncedUpperPriceRange) {
      filteredCars = filteredCars.filter((car) => car.pricePerDay <= debouncedUpperPriceRange)
    }

    // Favourites only
    if (favourites === "True") {
      filteredCars = filteredCars.filter((car)=> favouriteCarIds.includes(car.id))
    }

    // Search filter
    if (debouncedSearchText) {
      filteredCars = filteredCars.filter((car) => {
        return car.name.toLowerCase().includes(debouncedSearchText.trim().toLowerCase())
      })
    }
    
    setFilteredCountOfCars(filteredCars.length);
    setNoOfPages(Math.ceil(filteredCars.length / carsPerPage))
    setFilteredCars([...filteredCars])
  }, [transmission, type, sort, cars, availability, seats, favourites, favouriteCarIds, debouncedLowerPriceRange, debouncedUpperPriceRange, debouncedSearchText])

  useEffect(()=>{
    handleParamChange('page', null);
  }, [transmission, type, sort, cars, availability, seats, favourites, debouncedLowerPriceRange, debouncedUpperPriceRange, debouncedSearchText])
  
  useEffect(()=>{
    if (Number(currentPage) > noOfPages || Number(currentPage) < 1 || isNaN(Number(currentPage))) {
      handleParamChange('page', null)
    }
    setPagesArray(Array.from({ length: noOfPages }, (_, index) => index + 1));
    const startIndex = (currentPage - 1) * carsPerPage;
    const endIndex = startIndex + carsPerPage;
    const currentCars = filteredCars.slice(startIndex, endIndex);
    setcurrentDisplayOfCars([...currentCars])
  }, [filteredCars, currentPage, noOfPages])

  const handleSearchTextChange = (event) => {
    const value = event.target.value;
    if (value.length === 0) {
      handleParamChange("search", null)
      return
    }

    handleParamChange("search", value)
  }

  const handlePageNumberChange = (pageNumber) => () => {
    if (pageNumber === 1){
      handleParamChange("page", null)
    } else {
      handleParamChange("page", pageNumber)
    }
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
    });
  };

  return (
    <div className='mb-14'>
      <div className='flex sm:gap-10 gap-5 my-5 sm:mx-20 mx-5'>
        <div className='sm:w-56 min-w-40'>
          <h2 className='text-xl font-bold'>Filters</h2>
          <div className='flex flex-col gap-5 py-3'>
            <TransmissionFilter transmission={transmission} handleParamChange={handleParamChange} />
            <TypeFilter type={type} handleParamChange={handleParamChange} />
            <SeatFilter seats={seats} handleParamChange={handleParamChange}/>
            <PriceRangeFilter lowerRange={lowerPriceRange} upperRange={upperPriceRange} handleParamChange={handleParamChange} />
            <OtherFilters favourites={favourites} availability={availability} handleParamChange={handleParamChange}/>
          </div>
        </div>
        <div className='w-full'>
          <div>
            <div className='flex gap-3 items-center justify-between flex-col sm:flex-row'>
              <div className='w-full'>
                <div className='flex items-center gap-2 border-2 border-gray-200 border-solid rounded-md px-2 py-1 w-full focus-within:border-gray-300 transition-colors'>
                  <IoIosSearch size={"1.5em"} color="lightgray" />
                  <input type="text" defaultValue={searchText} placeholder='Search...' className='border-none focus:outline-none' onChange={handleSearchTextChange}></input>
                </div>
              </div>
              <Sort sort={sort} handleParamChange={handleParamChange} />
            </div>
            {!loading && !error && <div className='mt-1 mb-4'>
              <p className='italic'>Showing: <span className='font-semibold'>{FilteredCountOfCars} of {TotalCountOfCars} cars</span></p>
            </div>}
          </div>
          {loading && !error && <p className='text-center mt-5'>Loading data...</p>}
          {error && (
            <div className='flex flex-col items-center gap-5 mt-10'>
              <div className='flex flex-col items-center gap-1'>
                <VscErrorCompact size={"1.2em"} />
                <p className='text-center'>Error loading data: {error.message}</p>
              </div>
              <button className='bg-black text-white rounded-md px-3 py-1 flex gap-2 items-center hover:cursor-pointer' onClick={() => setLoading(true)}><GrPowerReset /><p>Retry</p></button>
            </div>
          )}
          {(filteredCars.length > 0) && (
            <div className='flex flex-col gap-5'>
              <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-8 gap-x-10'>
                {currentDisplayOfCars.map((car, index) => {
                  return <CarCard car={car} key={index} setFavouriteCarIds={setFavouriteCarIds} favouriteCarIds={favouriteCarIds}/>
                })}
              </div>
              <div className='flex gap-2 justify-center'>
                {pagesArray.map((pageNumber) => {
                  return (
                    <button key={pageNumber} className={`px-3 py-1 rounded-md ${Number(currentPage) === pageNumber || currentPage === null ? 'bg-black text-white' : 'bg-gray-200 text-black'}`} onClick={handlePageNumberChange(pageNumber)}>
                      {pageNumber}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
          {(!loading && !error && filteredCars.length === 0) && (
            <div className='flex flex-col items-center gap-5'>
              <div className='flex flex-col items-center gap-1'>
                <GoAlertFill size={"1.75em"} />
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

export default CarsPage
