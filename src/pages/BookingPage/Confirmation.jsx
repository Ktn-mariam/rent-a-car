import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { formatDate } from "../../helpers/dateFormatting";
import BookingCard from "../../components/BookingCard";

const Confirmation = ({setWizardStepNumber, startDate, endDate, driverInformation, handleConfirmBooking}) => {

  return (
    <div>
      <p className="mb-3">Confirm Booking Details:</p>
      <BookingCard startDate={startDate} endDate={endDate} driverInformation={driverInformation}/>
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
