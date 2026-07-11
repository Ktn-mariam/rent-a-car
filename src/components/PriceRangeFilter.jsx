import React from 'react'

const PriceRangeFilter = ({lowerRange, upperRange, handleParamChange}) => {
  const handleLowerRangeInputChange = (event) => {
    const value = event.target.value
    if (value) {
      handleParamChange("lowerPriceRange", value)
      return
    }
    handleParamChange("lowerPriceRange", null)
  }

  const handleUpperRangeInputChange = (event) => {
    const value = event.target.value
    if (value) {
      handleParamChange("upperPriceRange", value)
      return
    }
    handleParamChange("upperPriceRange", null)
  }

  return (
    <div>
      <h4 className='border-b-2 border-solid border-gray-200 mb-2 font-semibold'>Price Per Day</h4>
      <div className='flex items-center gap-2'>
        <input defaultValue={lowerRange} onChange={handleLowerRangeInputChange} className='border-2 border-zinc-200 w-14 rounded-md px-2' />
        to
        <input defaultValue={upperRange} onChange={handleUpperRangeInputChange} className='border-2 border-zinc-200 w-14 rounded-md px-2'/>
      </div>
    </div>
  )
}

export default PriceRangeFilter
