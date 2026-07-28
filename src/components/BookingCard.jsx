import { formatDate } from "../helpers/dateFormatting"

const BookingCard = ({ startDate, endDate, driverInformation }) => {
  let displayStartDate;
  let displayEndDate;

  if (startDate instanceof Date && !isNaN(startDate.getTime())) {
    displayStartDate = formatDate(startDate)
  } else {
    displayStartDate = startDate
  }

  if (endDate instanceof Date && !isNaN(endDate.getTime())) {
    displayEndDate = formatDate(endDate)
  } else {
    displayEndDate = endDate
  }
  console.log(endDate);
  
  return (
    <div>
      <p className="font-semibold">Selected Dates</p>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="">From:</label>
          <div type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1'>{displayStartDate}</div>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="">To:</label>
          <div type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1'>{displayEndDate}</div>
        </div>
      </div>
      <div className="mt-5">
        <p className="font-semibold">Driver Details</p>
        <div className="flex gap-3 w-full">
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="">Full Name</label>
            <div type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1'>{driverInformation.name}</div>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="">Mobile No.</label>
            <div type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1'>{driverInformation.mobileNo}</div>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="">License Number:</label>
            <div type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1'>{driverInformation.licenseNo}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingCard
