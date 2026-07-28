import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import AuthenticationContext from "../context/auth";
import { IoHome } from "react-icons/io5";
import { FaCar, FaUserAlt } from "react-icons/fa";
import { FaCalendarDay, FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const { logInData } = useContext(AuthenticationContext)
  const navigate = useNavigate();

  return (
    <div>
      <nav className='flex flex-col sm:flex-row justify-between items-center py-4 bg-black sm:px-20 px-5'>
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
      <nav className="flex justify-between px-20 items-center py-1 bg-zinc-200 mb-5">
        <div className="flex gap-10">
          <div onClick={() => { navigate('/') }} className="flex items-center gap-2 hover:cursor-pointer">
            <IoHome />
            <div>Home</div>
          </div>
          <div onClick={() => { navigate('/') }} className="flex items-center gap-2 hover:cursor-pointer">
            <FaCar />
            <div>Cars</div>
          </div>
          {logInData.isLoggedIn && 
            <div onClick={() => { navigate('/myBookings') }} className="flex items-center gap-2 hover:cursor-pointer">
              <FaCalendarDay />
              <div>My Bookings</div>
            </div>}
          </div>
        <div>
        {logInData.isLoggedIn ? 
          <div className="flex items-center gap-2 hover:cursor-pointer">
            <FaUserAlt />
            <div>Welcome {logInData.name.split(" ")[0]}</div>
          </div>
          : 
            <div onClick={() => { navigate('/login') }} className="flex items-center gap-2 hover:cursor-pointer">
            <FaCircleUser />
            <div>Sign In</div>
          </div>
        }
        </div>
      </nav>
    </div>
  )
}

export default Navbar
