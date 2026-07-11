import React from 'react'

const OtherFilters = ({favourites, availability, handleParamChange}) => {
  const handleAvailabilityChange = () => {
    if (availability === "True") {
      handleParamChange("availability", null)
      return
    }
    handleParamChange("availability", "True")
  }

  const handleFavouritesChange = () => {
    if (favourites === "True") {
      handleParamChange("favourites", null)
      return
    }
    handleParamChange("favourites", "True")
  }

  return (
    <div>
      <h4 className='border-b-2 border-solid border-gray-200 mb-2 font-semibold'>Other</h4>
      <div className='flex gap-2 items-center'>
        <button
          onClick={handleAvailabilityChange}
          className={`w-8 h-4 flex items-center rounded-full p-0.5 transition-colors ${availability === "True" ? "bg-black" : "bg-gray-300"
            }`}
        >
          <div
            className={`w-3 h-3 bg-white rounded-full transition-transform ${availability === "True" ? "translate-x-4" : ""
              }`}
          />
        </button>
        <p>Available only</p>
      </div>
      <div className='flex gap-2 items-center mt-1'>
        <button
          onClick={handleFavouritesChange}
          className={`w-8 h-4 flex items-center rounded-full p-0.5 transition-colors ${favourites === "True" ? "bg-black" : "bg-gray-300"
            }`}
        >
          <div
            className={`w-3 h-3 bg-white rounded-full transition-transform ${favourites === "True" ? "translate-x-4" : ""
              }`}
          />
        </button>
        <p>Favourites only</p>
      </div>
    </div>
  )
}

export default OtherFilters
