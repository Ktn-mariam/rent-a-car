import { useRef, useState } from "react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { MdError } from "react-icons/md";

const DriverDetails = ({setWizardStepNumber, driverInformation, setDriverInformation}) => {
  const [error, setError] = useState(null)
  const nameRef = useRef(null)
  const mobileNoRef = useRef(null)
  const licenseRef = useRef(null)

  const handleNextButton = () => {
    setError(null)
    const nameInput = nameRef.current.value;
    const mobileNoInput = mobileNoRef.current.value;
    const licenseInput = licenseRef.current.value;

    if (!nameInput || !mobileNoInput || !licenseInput) {
      setError("Please enter all fields")
      return
    }

    const DriverInfo = {name: nameInput, mobileNo: mobileNoInput, licenseNo: licenseInput}

    setDriverInformation(DriverInfo)
    setWizardStepNumber(3)
  }

  return (
    <div className="w-full">
      <p>Confirm Driver Details:</p>
      <form className="mt-5 flex gap-3 w-full" action="">
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="">Full Name</label>
          <input type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1' ref={nameRef} defaultValue={driverInformation.name} placeholder='Ex: John Max'/>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="">Mobile No.</label>
          <input type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1' ref={mobileNoRef} defaultValue={driverInformation?.mobileNo || null} placeholder='Ex: +971 50 123 5678'/>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="">License Number:</label>
          <input type="text" className='border-2 border-solid bg-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors py-1' ref={licenseRef} defaultValue={driverInformation?.licenseNo || null} placeholder='Ex: 123456789'/>
        </div>
      </form>
      {error && 
        <div className="flex gap-2 items-center mt">
          <MdError className="text-red-600" />
          <p className="text-red-600">Error: {error}</p>
        </div>}
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
