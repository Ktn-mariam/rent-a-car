import React, { createContext, useEffect, useState } from 'react'

const AuthenticationContext = createContext({
  signUpHandler: (name, email, password) => {},
  loginHandler: (email, password) => {},
  logInData: {isLoggedIn: false},
  setLogInData: () => {}
})

export const AuthenticationContextProvider = ({ children }) => {
  const [logInData, setLogInData] = useState({isLoggedIn: false})

  const signUpHandler = (name, email, password) => {
    const signUpDetails = {
      name,
      email,
      password,
    };

    localStorage.setItem("signUpDetails", JSON.stringify(signUpDetails));

    setLogInData({isLoggedIn: true, name, email, password})
  }

  const loginHandler = (email, password) => {
    const signUpDetails = JSON.parse(localStorage.getItem("signUpDetails"));

    if (!signUpDetails) {
      return { status: false, message: "You do not have an account, please sign up" };
    }
    
    const { email: storedEmail, password: storedPassword, name } = signUpDetails;

    if (email === storedEmail && password != storedPassword){
      return { status: false, message: "Invalid Password" }
    }

    if (email === storedEmail && password === storedPassword) {
      setLogInData({isLoggedIn: true, name, email, password})
      return { status: true };
    }

    return {status: false, message: "Please try again"}
  }

  let contextValue = {
    logInData,
    setLogInData,
    signUpHandler,
    loginHandler
  }

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContext