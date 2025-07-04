import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import displayDistance from '../lib/displayDistance'
import { MySocketContext } from '../context/SocketContext'

const ConformCaptainRide = ({ setShowRideNotification , setShowConformRide, ride, userScoketId }) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()
    const {sendMessage} = useContext(MySocketContext)
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' 
                onClick={()=>{setFinishRide(false)}}
            ><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-medium capitalize'> {ride.name} </h2>
                </div>
                <h5 className='text-lg font-semibold'>{displayDistance(ride?.DistanceBtwnCapToPickup)}</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <p className='text-sm -mt-1 text-gray-600'> {ride.pickup} </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <p className='text-sm -mt-1 text-gray-600'> {ride.destination} </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹fare </h3>
                            <p className='text-sm -mt-1 text-gray-600'> {ride.fare} Cash </p>
                        </div>
                    </div>
                </div>

                <div className='mt-6 w-full'>
                    
                        <input required
                        min = {100000}
                        max = {999999}
                        value={otp}
                        onChange={(e)=>{setOtp(e.target.value)}}
                        autoFocus
                        type="number" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />

                        <button
                        onClick={()=>{
                            if(ride.otp === otp) {
                                setShowConformRide(false)
                                setShowRideNotification(false)
                                sendMessage('startRideNotification', { userScoketId, ride })
                                navigate.state = ride
                                navigate("/ride", {
                                    state: {
                                        ride: ride,
                                    }
                                })
                            }
                        }}
                        type='button' className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>

                        <button
                        onClick={()=>{
                            // setIsConformRide(false)
                            setShowConformRide(false)
                            setShowRideNotification(false)
                        }}
                        className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>

                    
                </div>
            </div>
        </div>

    )
}

export default ConformCaptainRide