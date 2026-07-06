
const TypeFilter = ({type, handleTypeChange}) => {
  return (
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
  )
}

export default TypeFilter
