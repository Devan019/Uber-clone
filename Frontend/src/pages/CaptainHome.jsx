import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RideNotification from '../components/RideNotification';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConformCaptainRide from '../components/ConformCaptainRide';

const CaptainHome = () => {
  const [showRideNotification, setShowRideNotification] = useState(false);
  const [showConformRide, setShowConformRide] = useState(false);
  const ConfromRideRef = useRef(false)
  const rideRef =  useRef(null)


  useGSAP(()=>{
    if(showRideNotification){
        gsap.to(rideRef.current,{
            height: '100%',
            onStart : ()=>{
              console.log(rideRef.current)
              rideRef.current.classList.remove('hidden')
            },
            top : '0',
            zIndex : 9
        })
    }else{
        gsap.to(rideRef.current,{
            height: '-10%'
        })
    }
  } , [showRideNotification])

  useGSAP(()=>{
    console.log(showConformRide)
    if(showConformRide){
        gsap.to(ConfromRideRef.current,{
            height: '80%',
            
        })
    }else{
        gsap.to(ConfromRideRef.current,{
            height: '-10%'
        })
    }
  } , [showConformRide])

  useEffect(() => {
    setTimeout(() => {
      setShowRideNotification(true);
    }, 1000);
    
  } , [])
  

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div ref={rideRef} className="absolute hidden z-50 bg-zinc-100 w-full h-0">
        <RideNotification 
        setShowConformRide = {setShowConformRide}
        setShowRideNotification = {setShowRideNotification}
        />
      </div>
      <div ref={ConfromRideRef} className='absolute hidden z-50 bg-zinc-100 w-full h-0'>
          <ConformCaptainRide/>
      </div>
    </div>
  );
};

export default CaptainHome;
