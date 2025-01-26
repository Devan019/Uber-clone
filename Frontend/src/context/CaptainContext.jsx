import React, { createContext, useState } from 'react'


export const createCaptaionContext = createContext();


const CaptainContext = ({children}) => {

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
    location : {
      lat : '',
      long : ''
    },
    status : ''

  })

  return (
    <createCaptaionContext.Provider value={{Captain, setCaptain}}>
      {children}
    </createCaptaionContext.Provider>
  )
}

export default CaptainContext