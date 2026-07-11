import React from 'react'

const SeatFilter = ({seats, handleParamChange}) => {
  const options = ['All', '1-3', '4', '5', '6', '7', '7+']
  const label = ['All', '1to3', '4', '5', '6', '7', 'moreThan7']
  
  const handleSeatChange = (value) => {
    if (value === 'All') {
      handleParamChange("seats", null)
      return
    }

    handleParamChange("seats", value)
  }
  
  return (
    <div>
      <h4 className='border-b-2 border-solid border-gray-200 mb-2 font-semibold'>Seats</h4>
      <div className='flex gap-1 flex-wrap'>
        {options.map((option, index)=>{
          return <button key={option} className={`px-2 ${seats === label[index] ? 'bg-black text-white' : 'bg-zinc-200'} rounded-3xl`} onClick={()=>{handleSeatChange(label[index])}}>{option}</button>
        })}
        
      </div>
    </div>
  )
}

export default SeatFilter
