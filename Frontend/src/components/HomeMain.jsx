import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LocationPanel from './LocationPanel'
import VehiclePanel from './VehicalPanal'
import ConfirmRide from './ConformRide'
import LookingForDriver from './LookingForDriver'

const HomeMain = () => {
    const pannelRef = useRef(null)
    const vehicalRef = useRef(null)
    const conformRef = useRef(null)
    const driverRef = useRef(null)
    const [pannel, setpannel] = useState(false)
    const [vehicalPanal, setvehicalPanal] = useState(false)
    const [ridePanal , setridePanal] = useState(false)
    const [DriverPanal , setdriverPanal] = useState(false)

    useGSAP(() => {
        if (pannel) {
            gsap.to(pannelRef.current, {
                height: '75%'
            })
            gsap.to('.ini', {
                opacity: 1,
            })
        } else {
            gsap.to(pannelRef.current, {
                height: '0%'
            })
            gsap.to('.ini', {
                opacity: 0,
            })
        }
    }, [pannel])


    useGSAP(()=>{
        if(vehicalPanal){
            gsap.to(vehicalRef.current,{
                height: '70%'
            })
            setpannel(false)
        }else{
            gsap.to(vehicalRef.current,{
                height: '0%'
            })
        }
    } , [vehicalPanal])

    useGSAP(()=>{
        
        if(ridePanal){
            gsap.to(conformRef.current,{
                height : '70%'
            })

        }else{
            gsap.to(conformRef.current,{
                height : '0%'
            })
        }
    },[ridePanal])

    useGSAP(()=>{
        if(DriverPanal){
            gsap.to(driverRef.current,{
                height : '70%'
            })
        }else{
            setridePanal(false)
            setvehicalPanal(false)
            gsap.to(driverRef.current,{
                height : '0%'
            })
        }
    },[DriverPanal])

    return (
        <div>
            <div className='h-screen relative overflow-hidden'>
                <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <img className='w-full h-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
                <div

                 className=' flex flex-col justify-end h-screen absolute top-0 w-full' >
                    <div className='h-[27%] p-6 bg-white relative'>
                        <h5
                            className='ini absolute opacity-0  right-6 top-6 text-2xl'>
                            <i
                                onClick={() => {
                                    setpannel(false);
                                }}
                                className="ri-arrow-down-wide-line"></i>
                        </h5>
                        <h4 className='text-2xl font-semibold'>Find a trip</h4>
                        <form className='relative py-3' onSubmit={(e) => {

                        }}>
                            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                            <input

                                onClick={() => {
                                    setpannel(true)
                                }}
                                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                                type="text"
                                placeholder='Add a pick-up location'
                            />
                            <input
                                onClick={() => {
                                    setpannel(true)
                                }}
                                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                                type="text"
                                placeholder='Enter your destination' />
                        </form>
                        <button

                            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                            Find Trip
                        </button>
                    </div>
                    <div ref={pannelRef} className='bg-white h-0'>
                        <LocationPanel
                        vehicalPanal = {vehicalPanal}
                        setvehicalPanal = {setvehicalPanal}
                        />
                    </div>
                    <div ref={vehicalRef} className='absolute z-50 bg-zinc-100 w-full h-0'>
                        <VehiclePanel setridePanal = {setridePanal}  setvehicalPanal={setvehicalPanal} />
                    </div>
                    <div ref={conformRef} className='absolute z-50 bg-zinc-100 w-full h-0'>
                        <ConfirmRide
                        setvehicalPanal = {setvehicalPanal}
                        setridePanal = {setridePanal}
                        setdriverPanal = {setdriverPanal}
                        />
                        
                    </div>
                    <div ref={driverRef} className='absolute z-50 bg-zinc-100 w-full h-0'>
                        <LookingForDriver setdriverPanal = {setdriverPanal}/>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default HomeMain
