import React, { createContext, useState } from 'react'

export const RideCon = createContext()


const RideContext = ({children}) => {
  const [ride, setride] = useState({
    pickup : '',
    destination : '',
    fare : '',
    vehicleType : '',
    vehicleImg : '',

  })
  return (
    <RideCon.Provider value={{ride,setride}}>
      {children}
    </RideCon.Provider>
  )
}

export default RideContext