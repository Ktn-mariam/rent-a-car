
const Sort = ({sortByPrice, handleParamChange}) => {
  const handleSortChange = (event) => {
    const value = event.target.value;
    if (value === "Default") {
      handleParamChange("sort", null)
      return
    }
    handleParamChange("sort", value)
  }
  return (
    <div className='w-full sm:w-auto'>
      <select name="cars" id="Sorting" className='border-2 border-gray-200 border-solid rounded-md px-2 py-1 sm:w-40 w-full' value={sortByPrice} onChange={handleSortChange}>
        <option value="Default">Sort By Price</option>
        <option value="High">High to Low</option>
        <option value="Low">Low to High</option>
        <option value="NameAtoZ">Name: A to Z</option>
        <option value="NameZtoA">Name: Z to A</option>
      </select>
    </div>
  )
}

export default Sort
