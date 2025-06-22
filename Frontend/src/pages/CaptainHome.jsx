import React, { useState, useEffect, useRef, useContext } from 'react';
import { data, Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RideNotification from '../components/RideNotification';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConformCaptainRide from '../components/ConformCaptainRide';
import { CaptainContext } from '../context/CaptainContext';
import { MySocketContext } from '../context/SocketContext';
import axios from 'axios';

const CaptainHome = () => {
  const [showRideNotification, setShowRideNotification] = useState(false);
  const [showConformRide, setShowConformRide] = useState(false);
  const ConfromRideRef = useRef(false)
  const rideRef = useRef(null)
  const { Captain, setCaptain } = useContext(CaptainContext)
  const { sendMessage, socket, reciveMessage } = useContext(MySocketContext)
  const [name, setname] = useState("");
  const [ride, setride] = useState({})
  const capltdRef = useRef(0);
  const caplngRef = useState(0);
  const rideDataRef = useRef({});
  const [isConformRide, setIsConformRide] = useState(false)
  const [userScoketId, setUserScoketId] = useState(null)
  // console.log(Captain)

  async function main() {
    const api = await axios.get(`${import.meta.env.VITE_URI}/captain/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const getCaptain = api.data
    setCaptain({
      ...Captain,
      email: getCaptain.email,
      fullname: getCaptain.fullname,
      vehicle: getCaptain.vehicle,
      status: getCaptain.status,
      location: getCaptain.location
    })
    // console.log(Captain,getCaptain)
    localStorage.setItem('capatin_id', getCaptain._id)
  }

  const findDistance = async () => {
    const findDistanceapi = await axios.post(`${import.meta.env.VITE_URI}/map/getDistance`, {
      lat1: Number(capltdRef.current),
      lon1: Number(caplngRef.current),
      lat2: Number(rideDataRef.current.pickupCordinates.ltd),
      lon2: Number(rideDataRef.current.pickupCordinates.lng),
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })


    return findDistanceapi.data.distance
  }

  function sendLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        const ltd = latitude
        const lng = longitude
        caplngRef.current = lng;
        capltdRef.current = ltd;
        sendMessage('update-captain-location', {
          id: localStorage.getItem('capatin_id'),
          location: { ltd, lng }
        })

      }
      )
    }
  }

  const setactivecap = async () => {
    const api = await axios.post(`${import.meta.env.VITE_URI}/captain/active`, { status: 'active' },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    const data = api.data;
  }

  useEffect(() => {
    async function fetchData() {
      await main()
      await setactivecap()
      sendMessage('join', { id: localStorage.getItem('capatin_id'), type: 'captain' })
      setInterval(() => {
        sendLocation()
      }, 1000);
    }
    fetchData()
  }, [])

  useEffect(() => {
    reciveMessage('reciveRideRequest', async (data) => {
      console.log('reciveRideRequest', data);
      setride(data.ride);
      rideDataRef.current = data.ride;
      const distance = await findDistance();
      setride((prevride) => {
        return {
          ...prevride,
          waitCaptainCordinates: {
            ltd: capltdRef.current,
            lng: caplngRef.current
          },
          DistanceBtwnCapToPickup: distance
        }
      })

      rideDataRef.current = {
        ...rideDataRef.current,
        waitCaptainCordinates: {
          ltd: capltdRef.current,
          lng: caplngRef.current
        },
        DistanceBtwnCapToPickup: distance
      }

      setname(data.name);
      setShowRideNotification(true);
      setUserScoketId(data.IAmSocketId);
    })


    if (showConformRide) {
      console.log('showConformRide', showConformRide);
      setTimeout(() => {
        console.log('sendForRide');
        sendMessage('sendForRide', {
          userSocketId: userScoketId,
          name: Captain.fullname,
          ride: rideDataRef.current,
          IAmSocketId: socket.id
        })
      }, 1000);
    } else {
      console.log('showConformRide', showConformRide);
      setTimeout(() => {
        console.log('sendForRide');
        sendMessage('sendForRide', {
          userSocketId: userScoketId,
          name: Captain.fullname,
          ride: {},
          IAmSocketId: socket.id
        })
      }, 1000);
    }
  }, [socket, showConformRide])

  useGSAP(() => {
    if (showRideNotification) {
      gsap.to(rideRef.current, {
        onStart: () => {
          rideRef.current.classList.remove('overflow-hidden')
        },
        top: 0,
        height: '100%',
      })
    } else {
      gsap.to(rideRef.current, {
        onStart: () => {
          ConfromRideRef.current.classList.add('overflow-hidden')
        },
        top: '100%',
        height: '0%',
      })
    }
  }, [showRideNotification])

  useGSAP(() => {
    if (showConformRide) {
      gsap.to(ConfromRideRef.current, {
        onStart: () => {
          ConfromRideRef.current.classList.remove('overflow-hidden')
        },
        top: 0,
        height: '100%',
      })
    } else {

      gsap.to(ConfromRideRef.current, {
        onStart: () => {
          ConfromRideRef.current.classList.add('overflow-hidden')
        },
        top: '100%',
        height: '0%'
      })
    }
  }, [showConformRide])

  useEffect(() => {
    // setTimeout(() => {
    //   setShowRideNotification(true);
    // }, 1000);

  }, [showRideNotification])


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
          setShowConformRide={setShowConformRide}
          setShowRideNotification={setShowRideNotification}
          name={name}
          ride={rideDataRef.current}
        />
      </div>
      <div ref={ConfromRideRef} className='absolute z-50 bg-zinc-100 w-full h-0 overflow-hidden'>
        <ConformCaptainRide
          // isConformRide={isConformRide}
          ride={rideDataRef.current}
          setShowConformRide={setShowConformRide}
          setShowRideNotification={setShowRideNotification}
        />
      </div>

    </div>
  );
};

export default CaptainHome;
