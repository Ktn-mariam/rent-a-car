import React, { createContext, useEffect, useState } from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import { FaCircleInfo } from "react-icons/fa6";

const ToastNotificationsContext = createContext({
})

export const ToastNotificationsContextProvider = ({ children }) => {
  const [toast, setToast] = useState(null)

  useEffect(()=>{
  }, [])

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  let contextValue = {
    
  }

  return (
    <ToastNotificationsContext.Provider value={contextValue}>
      {toast && toast.type === "success" && (
        <div className='flex gap-3 bg-green-200'>
          <FaCircleCheck className='bg-green-600' />
          <p>{toast.message}</p>
        </div>
      )}
      {toast && toast.type === "error" && (
        <div className='flex gap-3 bg-red-600'>
          <FaCircleXmark className='bg-red-600'/>
          <p>{toast.message}</p>
        </div>
      )}
      {toast && toast.type === "warning" && (
        <div className='flex gap-3 bg-amber-200'>
          <IoWarning className='bg-amber-600'/>
          <p>{toast.message}</p>
        </div>
      )}
      {toast && toast.type === "information" && (
        <div className='flex gap-3 bg-sky-200'>
          <FaCircleInfo className='bg-sky-600'/>
          <p>{toast.message}</p>
        </div>
      )}
      {children}
    </ToastNotificationsContext.Provider>
  )
}

export default ToastNotificationsContext