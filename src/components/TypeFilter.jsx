
const TypeFilter = ({type, handleParamChange}) => {
  const types = type.split("OR")
  console.log(types);
  

  const handleTypeChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked
    if (value === "All" && isChecked) {
      handleParamChange("type", null)
    } else if (isChecked) {
      console.log("ischecked");
      
      const newType = types.filter((t)=> t !== "All")
      console.log(newType);
      
      if (newType.length >0) {
        handleParamChange("type", `${newType.join("OR")}OR${value}`)
      } else {
        handleParamChange("type", `${value}`)
      }
    } else if (!isChecked) {
      const newType = types.filter((t)=> t !== value)
      handleParamChange("type", newType.join("OR"))
    }
  };

  return (
    <div>
      <h4 className='border-b-2 border-solid border-gray-200 mb-2 font-semibold'>Type</h4>
      <div>
        <div className='flex gap-1 items-center'>
          <input type="checkbox" name="Type" id="All" value="All" checked={types.includes('All')} onChange={handleTypeChange}/>
          <label htmlFor="All">All</label>
        </div>
        <div className='flex gap-1 items-center'>
          <input type="checkbox" name="Type" id="Economy" value="Economy" checked={types.includes('Economy')} onChange={handleTypeChange}/>
          <label htmlFor="Economy">Economy</label>
        </div>
        <div className='flex gap-1 items-center'>
          <input type="checkbox" name="Type" id="Sedan" value="Sedan" checked={types.includes('Sedan')} onChange={handleTypeChange}/>
          <label htmlFor="Sedan">Sedan</label>
        </div>
        <div className='flex gap-1 items-center'>
          <input type="checkbox" name="Type" id="SUV" value="SUV" checked={types.includes('SUV')} onChange={handleTypeChange}/>
          <label htmlFor="SUV">SUV</label>
        </div>
        <div className='flex gap-1 items-center'>
          <input type="checkbox" name="Type" id="Luxury" value="Luxury" checked={types.includes('Luxury')} onChange={handleTypeChange}/>
          <label htmlFor="Luxury">Luxury</label>
        </div>
      </div>
    </div>
  )
}

export default TypeFilter
