import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { formatDate } from "../../helpers/dateFormatting";

const Confirmation = ({setWizardStepNumber, startDate, endDate, driverInformation, handleConfirmBooking}) => {

  return (
    <div>
      <p className="mb-3">Confirm Booking Details:</p>
      <p className="border-b-2 border-zinc-200 mb-3">Selected Dates</p>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="">From:</label>
          <div type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1'>{formatDate(startDate)}</div>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="">To:</label>
          <div type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1'>{formatDate(endDate)}</div>
        </div>
      </div>
      <div className="mt-5">
        <p className="border-b-2 border-zinc-200 mb-3">Driver Details</p>
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
      <div className="flex gap-3 items-end justify-end">
        <button onClick={()=> setWizardStepNumber(2)} className='flex items-center gap-2 bg-black text-white rounded-md px-3 py-1 hover:cursor-pointer mt-7'>
          <FaArrowLeft />
          <p>Back</p>
        </button>
        <button onClick={handleConfirmBooking} className='bg-black text-white rounded-md px-3 py-1 hover:cursor-pointer mt-7'>
          <p>Confirm Booking</p>
        </button>
      </div>
    </div>
  )
}

export default Confirmation
