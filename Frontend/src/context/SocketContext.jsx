import React, { createContext,useEffect, useState } from 'react'

export const MySocketContext = createContext()
import { io } from 'socket.io-client'

const SocketContext = ({children}) => {


  const socket = io(`${import.meta.env.VITE_URI}`)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })
  }
  , [])

  const sendMessage = (evt, messege) => {
    socket.emit(evt, messege)
  }

  const reciveMessage = (evt, callback) => {
    socket.on(evt, callback)
  }

  return (
    <MySocketContext.Provider value={{socket, sendMessage, reciveMessage}}>
      {children}
    </MySocketContext.Provider>
  )
}

export default SocketContext