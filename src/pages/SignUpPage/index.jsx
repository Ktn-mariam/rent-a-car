import { MdAccountCircle, MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

const SignUpPage = () => {
  return (
    <div className='flex items-center justify-center'>
      <form className='flex flex-col mt-20 border-2 border-solid border-zinc-200 px-8 py-10 rounded-3xl gap-7 lg:w-1/3 w-96'>
        <h1 className='text-2xl font-bold self-center'>Create Account</h1>
        <div className='flex gap-2 items-center border-2 border-solid border-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors'>
          <MdAccountCircle size={'1.3rem'} className="text-zinc-300"/>
          <input type="text" className='py-1 w-full border-none focus:outline-none' placeholder='Full Name'/>
        </div>
        <div className='flex gap-2 items-center border-2 border-solid border-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors'>
          <MdEmail size={'1.3rem'} className="text-zinc-300"/>
          <input type="text"  className='py-1 w-full border-none focus:outline-none' placeholder='Email'/>
        </div>
        <div className='flex gap-2 items-center border-2 border-solid border-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors'>
          <FaLock size={'1rem'} className="text-zinc-300"/>
          <input type="password"  className='py-1 w-full border-none focus:outline-none' placeholder='Password'/>
        </div>
        <div className='flex gap-2 items-center border-2 border-solid border-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors'>
          <FaLock size={'1rem'} className="text-zinc-300"/>
          <input type="password"  className='py-1 w-full border-none focus:outline-none' placeholder='Retype Password'/>
        </div>
        <button className='bg-black text-white py-2 rounded-md'>Sign up</button>
      </form>
    </div>
  )
}

export default SignUpPage
