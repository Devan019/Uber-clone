import React, { createContext, useState } from 'react'

export const RideCon = createContext()


const RideContext = ({children}) => {
  const [ride, setride] = useState({
    pickup : '',
    destination : '',
    fare : '',
    vehicleType : '',
    vehicleImg : '',
    pickupCordinates : {
      ltd : 0,
      lng : 0
    },
    destinationCordinates  : {
      ltd : 0,
      lng : 0
    },
    waitCaptainCordinates : {
      ltd : 0,
      lng : 0
    },
    DistanceBtwnCapToPickup : 0
  })
  return (
    <RideCon.Provider value={{ride,setride}}>
      {children}
    </RideCon.Provider>
  )
}

export default RideContext