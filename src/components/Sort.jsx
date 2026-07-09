
const Sort = ({sortByPrice, handleSortChange}) => {
  return (
    <div>
      <select name="cars" id="Sorting" className='border-2 border-gray-200 border-solid rounded-md px-2 py-1 w-40' value={sortByPrice} onChange={handleSortChange}>
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
