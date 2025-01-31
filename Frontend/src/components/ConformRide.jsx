import React, { useContext,useEffect } from 'react'
import {RideCon} from '../context/RideContext'
import axios from 'axios'
import { MySocketContext } from '../context/SocketContext'
import { CreateUserContext } from '../context/UserContext'

const ConfirmRide = ({setvehicalPanal,setridePanal,setdriverPanal}) => {
    const {ride,setride} = useContext(RideCon)
    const {sendMessage} = useContext(MySocketContext)
    const {globalUser} = useContext(CreateUserContext)
    async function main(){
        const str = `${import.meta.env.VITE_URI}/ride/create`;

        
        const api = await axios.post(str,ride,{
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await api.data;

        console.log(ride)

        sendMessage('newRide',{ride:ride})

        

    }
    // console.log("wow " , ride)
    return (
        <div>
            <h5 
            onClick={()=>{setridePanal(false)}}
            className='p-1 text-center right-0  absolute top-0' ><i className="text-3xl text-zinc-900 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20' src={ride.vehicleImg} alt={ride.vehicleType} />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{ride.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button  
                onClick={()=>{
                    setdriverPanal(true);
                    setvehicalPanal(false);
                    setridePanal(false)
                    main()
                }
                    
                }
                className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide