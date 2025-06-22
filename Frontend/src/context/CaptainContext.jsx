import React, { createContext, useState } from 'react'


export const CaptainContext = createContext();


const CaptainContextProvider = ({children}) => {

  const [Captain, setCaptain] = useState({
    email : '',
    fullname : {
      firstname : '',
      lastname : ''
    },
    password : '',
    vehicle : {
      color : '',
      plate : '',
      capacity : '',
      type : ''
    },
    status : 'inactive'

  })

  return (
    <CaptainContext.Provider value={{Captain, setCaptain}}>
      {children}
    </CaptainContext.Provider>
  )
}

export default CaptainContextProvider