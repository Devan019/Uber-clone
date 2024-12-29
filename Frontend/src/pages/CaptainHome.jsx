import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RideNotification from '../components/RideNotification';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConformCaptainRide from '../components/ConformCaptainRide';
import FinishRide from '../components/FinishRide';

const CaptainHome = () => {
  const [showRideNotification, setShowRideNotification] = useState(false);
  const [showConformRide, setShowConformRide] = useState(false);
  const ConfromRideRef = useRef(false)
  const rideRef =  useRef(null)


  useGSAP(()=>{
    if(showRideNotification){
        gsap.to(rideRef.current,{
            onStart : ()=>{
              rideRef.current.classList.remove('overflow-hidden')
            },
            top:0,
            height : '100%',
        })
    }else{
        gsap.to(rideRef.current,{
          onStart : () => {
            ConfromRideRef.current.classList.add('overflow-hidden')
          },
            top : '100%',
            height : '0%',
        })
    }
  } , [showRideNotification])

  useGSAP(()=>{
    if(showConformRide){
        gsap.to(ConfromRideRef.current,{
          onStart : ()=>{
            ConfromRideRef.current.classList.remove('overflow-hidden')
          },
          top:0,
          height : '100%',
        })
    }else{
      
        gsap.to(ConfromRideRef.current,{
          onStart : () => {
            ConfromRideRef.current.classList.add('overflow-hidden')
          },
            top : '100%',
            height : '0%'
        })
    }
  } , [showConformRide])



  useEffect(() => {
    setTimeout(() => {
      setShowRideNotification(true);
    }, 1000);
    
  } , [showRideNotification])
  

  return (
    <div className="h-screen">
      <div className="fixed  p-6 top-0 flex items-center justify-between w-screen">
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
      <div className="h-2/5 z-10 p-6">
        <CaptainDetails />
      </div>
      <div ref={rideRef} className="absolute z-50 bg-zinc-100 w-full h-0 overflow-hidden">
        <RideNotification 
        setShowConformRide = {setShowConformRide}
        setShowRideNotification = {setShowRideNotification}
        />
      </div>
      <div ref={ConfromRideRef} className='absolute z-50 bg-zinc-100 w-full h-0 overflow-hidden'>
          <ConformCaptainRide
          setShowConformRide = {setShowConformRide}
          setShowRideNotification = {setShowRideNotification}
          />
      </div>
      
    </div>
  );
};

export default CaptainHome;
