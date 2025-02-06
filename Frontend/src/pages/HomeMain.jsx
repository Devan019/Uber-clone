import React, { useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LocationPanel from '../components/LocationPanel'
import VehiclePanel from '../components/VehicalPanal'
import ConfirmRide from '../components/ConformRide'
import LookingForDriver from '../components/LookingForDriver'
import axios, { all } from 'axios'
import { RideCon } from '../context/RideContext'
import { useNavigate } from 'react-router-dom'
import { MySocketContext } from '../context/SocketContext'
import { CreateUserContext } from '../context/UserContext'
const HomeMain = () => {

    const { sendMessage, reciveMessage } = useContext(MySocketContext)
    const { globalUser, setglobaluser } = useContext(CreateUserContext)
    const navigate = useNavigate()
    const pannelRef = useRef(null)
    const vehicalRef = useRef(null)
    const conformRef = useRef(null)
    const driverRef = useRef(null)
    const [pannel, setpannel] = useState(false)
    const [vehicalPanal, setvehicalPanal] = useState(false)
    const [ridePanal, setridePanal] = useState(false)
    const [DriverPanal, setdriverPanal] = useState(false)

    const [pickup, setPickup] = useState("")
    const [destination, setDestination] = useState("")

    const [suggestions, setsuggestions] = useState([])
    const [active, setactive] = useState(null)

    const [fares, setfares] = useState({})
    const { ride, setride } = useContext(RideCon);

    const [nearCaptains, setnearCaptains] = useState([])
    const [findtripBtn, setfindtripBtn] = useState(false)

    async function main() {
        const api = await axios.get(`${import.meta.env.VITE_URI}/user/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        const data = api.data;
        if (data.err) {
            navigate('/login')
        }
        
        setglobaluser({
            email : data.email,
            name : data.name
        })

        localStorage.setItem('id', data._id)
    }

    async function getCaptains() {
        const api = await axios.post(`${import.meta.env.VITE_URI}/map/getNearCaptains`, {
            pickup, destination
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        const data = api.data;
        console.log(data)
    }

    useEffect(() => {
        async function forapi() {
            
            await main()
            sendMessage('join', { id: localStorage.getItem('id'), type: 'user' })
        }

        forapi()
    },[])



    useEffect(() => {
        async function main() {
            const api = await axios.post(`${import.meta.env.VITE_URI}/map/getsuggestion`, {
                addresh: pickup
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })

            const data = api.data;

            if (!data.mess) {
                setsuggestions(Array(data.allSuggestions)[0])

            }
        }
        main()
    }, [pickup])

    useEffect(() => {
        async function main() {
            const api = await axios.post(`${import.meta.env.VITE_URI}/map/getsuggestion`, {
                addresh: destination
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })


            const data = api.data;

            if (!data.mess) {
                setsuggestions(Array(data.allSuggestions)[0])
            }
        }
        main()
    }, [destination])

    useEffect(() => {

        async function main() {
            const api = await axios.post(`${import.meta.env.VITE_URI}/ride/getPrices`, {
                pickup, destination
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = api.data;
            // console.log(data.car , typeof data)
            if (!data.mess) {
                setfares(data)
                // setride({...ride, ride:api.data});
            }
        }

        if (vehicalPanal) {
            main()
        }
    }, [vehicalPanal])


    useGSAP(() => {
        if (pannel) {
            // console.log("op")
            gsap.to(pannelRef.current, {
                height: '75%'
            })
            gsap.to('.ini', {
                opacity: 1,
            })
        } else {
            // console.log("op no")
            gsap.to(pannelRef.current, {
                height: '0%'
            })
            gsap.to('.ini', {
                opacity: 0,
            })
        }
    }, [pannel])


    useGSAP(() => {
        if (vehicalPanal) {
            gsap.to(vehicalRef.current, {
                height: '70%'
            })
            setpannel(false)
        } else {
            gsap.to(vehicalRef.current, {
                height: '0%'
            })
        }
    }, [vehicalPanal])

    useGSAP(() => {

        if (ridePanal) {
            gsap.to(conformRef.current, {
                height: '70%'
            })

        } else {
            gsap.to(conformRef.current, {
                height: '0%'
            })
        }
    }, [ridePanal])

    useGSAP(() => {
        if (DriverPanal) {
            gsap.to(driverRef.current, {
                height: '70%'
            })
        } else {
            setridePanal(false)
            setvehicalPanal(false)
            gsap.to(driverRef.current, {
                height: '0%'
            })
        }
    }, [DriverPanal])



    useEffect(() => {
        
        if (findtripBtn) {
            getCaptains()
        }
    }, [findtripBtn])

    return (
        <div>

            <div className='h-screen relative overflow-hidden'>
                <img
                    onClick={() => {
                        navigate('/', {
                            state: { logout: true }
                        })
                    }}
                    className='z-10 w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <form action="">
                    <button className='text-2xl absolute right-4 top-4 z-10 font-bold' type='submit'>Logout</button>
                </form>
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
                                    setactive("pickup")
                                }}
                                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                                type="text"
                                placeholder='Add a pick-up location'
                                onChange={(evt) => { setPickup(evt.target.value); setride({ ...ride, pickup: evt.target.value }); }}
                                value={pickup}
                            />
                            <input
                                onClick={() => {
                                    setpannel(true)
                                    setactive("destination")
                                }}
                                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                                type="text"
                                onChange={(evt) => { setDestination(evt.target.value); setride({ ...ride, destination: evt.target.value }) }}
                                value={destination}
                                placeholder='Enter your destination' />
                        </form>
                        <button
                            onClick={() => {
                                if (pickup && destination) {
                                    setvehicalPanal(true)
                                }
                                setfindtripBtn(true)
                                console.log("op-1")
                            }}
                            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                            Find Trip
                        </button>
                    </div>
                    <div ref={pannelRef} className='bg-white h-0'>
                        <LocationPanel
                            suggestions={suggestions}
                            setpickup={setPickup}
                            setdestination={setDestination}
                            active={active}
                        />
                    </div>
                    <div 
                    onClick={() => {
                        setfindtripBtn(false)
                        console.log("op-2")
                    }}
                    ref={vehicalRef} className='absolute z-50 bg-zinc-100 w-full h-0'>
                        <VehiclePanel
                            setfindtripBtn = {setfindtripBtn}
                            fares={fares}
                            setridePanal={setridePanal}
                            setvehicalPanal={setvehicalPanal} />
                    </div>
                    <div ref={conformRef} className='absolute z-50 bg-zinc-100 w-full h-0'>
                        <ConfirmRide
                            setvehicalPanal={setvehicalPanal}
                            setridePanal={setridePanal}
                            setdriverPanal={setdriverPanal}
                        />

                    </div>
                    <div ref={driverRef} className='absolute z-50 bg-zinc-100 w-full h-0'>
                        <LookingForDriver setdriverPanal={setdriverPanal} />
                    </div>
                </div>



            </div>
        </div>
    )
}

export default HomeMain
