import { useState } from 'react'

const PriceRangeFilter = ({lowerRange, upperRange, handleParamChange}) => {
  const [error, setError] = useState(null)
  const handleLowerRangeInputChange = (event) => {
    const value = event.target.value
    if (value && upperRange && value > Number(upperRange)) {
      setError("Lower range cannot be greater than upper range")
      return
    }
    if (value && value < 0) {
      setError("Price cannot be less than 0")
      return
    }
    setError(null)
    if (value) {
      handleParamChange("lowerPriceRange", value)
      return
    }
    handleParamChange("lowerPriceRange", null)
  }

  const handleUpperRangeInputChange = (event) => {
    const value = event.target.value
    if (value && lowerRange && value < Number(lowerRange)) {
      setError("Upper range cannot be less than lower range")
      return
    }
    if (value && value < 0) {
      setError("Price cannot be less than 0")
      return
    }
    setError(null)
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
        <input placeholder='min' type='number' defaultValue={lowerRange} onChange={handleLowerRangeInputChange} className='border-2 border-zinc-200 w-16 rounded-lg px-2' />
        to
        <input placeholder='max' type='number' defaultValue={upperRange} onChange={handleUpperRangeInputChange} className='border-2 border-zinc-200 w-16 rounded-lg px-2'/>
      </div>
      {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
    </div>
  )
}

export default PriceRangeFilter
