import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSearchParams, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className='flex justify-between items-center mb-5 py-4 bg-black px-20'>
      <h1 className="text-3xl font-bold text-center text-white">
        Car Rental Platform
      </h1>
      <div className='flex items-center justify-center gap-2'>
        <button className='flex items-center gap-1 text-white  hover:bg-zinc-800 px-3 py-2 rounded-md' onClick={() => { navigate(-1) }}>
          <FaArrowLeft color='white' />
          Back
        </button>
        <button className='flex items-center gap-1 text-white hover:bg-zinc-800 px-3 py-2 rounded-md' onClick={() => { navigate(1) }}>
          <FaArrowRight color='white' />
          Forward
        </button>
      </div>
    </nav>
  )
}

export default Navbar
