
const TransmissionFilter = ({transmission, handleTransmissionChange}) => {
  return (
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
  )
}

export default TransmissionFilter
