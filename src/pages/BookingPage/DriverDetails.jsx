import { useRef } from "react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const DriverDetails = ({setWizardStepNumber}) => {
  const nameRef = useRef(null)
  const mobileNoRef = useRef(null)
  const licenseRef = useRef(null)

  const handleNextButton = () => {
    const nameInput = nameRef.current.value;
    const mobileNoInput = mobileNoRef.current.value;
    const licenseInput = LicenseRef.current.value;

    const DriverDetails = {name: nameInput, mobileNo: mobileNoInput, licenseNo: licenseInput}

    setWizardStepNumber(3)
  }

  return (
    <div className="w-full">
      <p>Confirm Driver Details:</p>
      <form className="mt-5 flex gap-3 w-full" action="">
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="">Full Name</label>
          <input type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1' placeholder='Ex: John Max'/>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="">Mobile No.</label>
          <input type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1' placeholder='Ex: example@gmail.com'/>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="">License Number:</label>
          <input type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1' placeholder='Ex: 123456789'/>
        </div>
      </form>
      <div className="flex gap-3 items-end justify-end">
        <button onClick={()=> setWizardStepNumber(1)} className='flex items-center gap-4 bg-black text-white rounded-md px-3 py-1 hover:cursor-pointer mt-7'>
          <FaArrowLeft />
          <p>Back</p>
        </button>
        <button onClick={handleNextButton} className='flex items-center gap-4 bg-black text-white rounded-md px-3 py-1 hover:cursor-pointer mt-7'>
          <p>Next</p>
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}

export default DriverDetails
