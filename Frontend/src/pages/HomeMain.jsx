import  { useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import VehiclePanel from '../components/VehicalPanal'
import ConfirmRide from '../components/ConformRide'
import LookingForDriver from '../components/LookingForDriver'
import axios from 'axios'
import { RideCon } from '../context/RideContext'
import { useNavigate } from 'react-router-dom'
import { MySocketContext } from '../context/SocketContext'
import { CreateUserContext } from '../context/UserContext'
import OtpSendToUser from '../components/OtpSendToUser'
const HomeMain = () => {

    const { sendMessage, reciveMessage, socket } = useContext(MySocketContext)
    const { globalUser, setglobaluser } = useContext(CreateUserContext)
    const { ride, setride } = useContext(RideCon);

    const navigate = useNavigate()
    const pannelRef = useRef(null)
    const vehicalRef = useRef(null)
    const conformRef = useRef(null)
    const driverRef = useRef(null)
    const [pannel, setpannel] = useState(false)
    const [vehicalPanal, setvehicalPanal] = useState(false)
    const [ridePanal, setridePanal] = useState(false)
    const [DriverPanal, setdriverPanal] = useState(false)

    const [isConformRide, setisConformRide] = useState(false)

    const googleMapRef = useRef(null);
    const conformRide =  useRef(null);

    const mapRef = useRef(null);
    const pickupMarkerRef = useRef(null);
    const destinationMarkerRef = useRef(null);
    const directionsServiceRef = useRef(null);
    const directionsRendererRef = useRef(null);

    const [pickup, setPickup] = useState("")
    const [destination, setDestination] = useState("")

    const [suggestions, setsuggestions] = useState([])
    const [active, setactive] = useState(null)

    const [fares, setfares] = useState({})

    const [nearCaptains, setnearCaptains] = useState([])
    const [findtripBtn, setfindtripBtn] = useState(false)

    const [nextcap, setnextcap] = useState(false)
    const [lookingForDriverPanal, setlookingForDriverPanal] = useState(false)

    const nearCapsRef = useRef([])
    const capindex = useRef(1)

    const centerRef = useRef({})
    const pickupRef = useRef(null);
    const destinationRef = useRef(null);
    const rideRef = useRef(null);

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
            email: data.email,
            name: data.fullname.fname + " " + data.fullname.lname
        })

        localStorage.setItem('id', data._id)
    }

    async function getCaptains() {
        const api = await axios.post(`${import.meta.env.VITE_URI}/map/getNearCaptains`, {
            pickup, destination, vechicleType: ride.vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        const data = api.data;
        nearCapsRef.current = data
        setnearCaptains(data);
    }

    function autoCompletion(val, isDestination) {
        const defaultBounds = {
            north: centerRef.current.lat + 0.1,
            south: centerRef.current.lat - 0.1,
            east: centerRef.current.lng + 0.1,
            west: centerRef.current.lng - 0.1,
        };

        const options = {
            bounds: defaultBounds,
            componentRestrictions: { country: "in" },
            fields: ["address_components", "geometry", "icon", "name"],
            strictBounds: false,
        };
        const autocomplete = new google.maps.places.Autocomplete(val, options);

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();

            if (!place.geometry || !place.geometry.location || !isDestination) {
                alert("No details available for selected destination!");
                return;
            }

            const destinationLatLng = place.geometry.location;

            // Add or update destination marker
            if (destinationMarkerRef.current) {
                destinationMarkerRef.current.setMap(null);
            }
            const map = googleMapRef.current

            destinationMarkerRef.current = new google.maps.Marker({
                position: destinationLatLng,
                map,
                title: "Destination",
            });


            // Draw route from pickup to destination
            if (pickupMarkerRef.current && directionsServiceRef.current && directionsRendererRef.current) {
                directionsServiceRef.current.route(
                    {
                        origin: pickupMarkerRef.current.getPosition(),
                        destination: destinationLatLng,
                        travelMode: google.maps.TravelMode.DRIVING,
                    },
                    (response, status) => {
                        if (status === "OK") {
                            directionsRendererRef.current.setDirections(response);
                        } else {
                            alert("Directions request failed: " + status);
                        }
                    }
                );
            }
        });
    }

    useEffect(() => {
        async function forapi() {
            await main()
            sendMessage('join', { id: localStorage.getItem('id'), type: 'user' })
        }
        forapi()
    }, [])



    useEffect(() => {
        if (pickup) {

            if (pickupRef.current != null) {
                autoCompletion(pickupRef.current, false)
            }
        }
    }, [pickup])
    

    useEffect(() => {
        if (destination) {
            if (destinationRef.current != null) {
                autoCompletion(destinationRef.current, true);
            }
        }
    }, [destination])

    useEffect(() => {

        async function main() {
            let pickupsend = pickupRef.current.value;
            let destinationsend = destinationRef.current.value;
            const api = await axios.post(`${import.meta.env.VITE_URI}/ride/getPrices`, {
                pickup: pickupsend, destination: destinationsend
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = api.data;
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

    useGSAP(() => {
        if (isConformRide) {
            gsap.to(conformRide.current, {
                height: '100%'
            })
            gsap.to('.ini', {
                opacity: 1,
            })
        } else {
            gsap.to(conformRide.current, {
                height: '0%'
            })
            gsap.to('.ini', {
                opacity: 0,
            })
        }
    }, [isConformRide])


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

    const setCorrinates = async () => {
        const getPickupCordinates = await axios.post(`${import.meta.env.VITE_URI}/map/getCordinates`, { address: ride.pickup }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        const getDestinationCordinates = await axios.post(`${import.meta.env.VITE_URI}/map/getCordinates`, { address: ride.destination }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        setride((prevride) => {
            return {
                ...prevride,
                pickupCordinates: {
                    ltd: getPickupCordinates.data.corrinates.ltd,
                    lng: getPickupCordinates.data.corrinates.lng
                },
                destinationCordinates: {
                    ltd: getDestinationCordinates.data.corrinates.ltd,
                    lng: getDestinationCordinates.data.corrinates.lng
                }
            }
        })
    }

    useGSAP(() => {

        if (ridePanal) {
            setCorrinates()
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

    function helpToSendRideToCaptain(capsocketId) {
        console.log("helpToSendRideToCaptain", capsocketId, rideRef.current);
        sendMessage('sendForRide', {
            userSocketId: capsocketId,
            name: globalUser.name,
            ride: rideRef.current,
            IAmSocketId: socket.id
        })
    }

    useEffect(() => {
        if (lookingForDriverPanal) {
            setTimeout(async () => {
                await getCaptains();
                helpToSendRideToCaptain(nearCapsRef.current[0].socketId);
            }, 1000);
        }
    }, [lookingForDriverPanal])


    useEffect(() => {
        if (nextcap) {

        }
    }, [nextcap])


    //for current location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (curr) => {
                centerRef.current = {
                    lat: curr.coords.latitude,
                    lng: curr.coords.longitude
                }

                googleMapRef.current = new window.google.maps.Map(mapRef.current, {
                    center: {
                        lat: curr.coords.latitude,
                        lng: curr.coords.longitude,
                    },
                    zoom: 14,
                    minZoom: 3,      // allows zooming out
                    maxZoom: 20,      // optional, prevent zooming too far in
                    gestureHandling: "greedy"
                });

                const map = googleMapRef.current;

                pickupMarkerRef.current = new window.google.maps.Marker({
                    position: {
                        lat: curr.coords.latitude,
                        lng: curr.coords.longitude,
                    },
                    map,
                    title: "Pickup Location",
                });

                directionsServiceRef.current = new google.maps.DirectionsService();
                directionsRendererRef.current = new google.maps.DirectionsRenderer({
                    suppressMarkers: true, // contols myself
                });

                directionsRendererRef.current.setMap(map);



                const api = await axios.post(`${import.meta.env.VITE_URI}/map/getlocation`, {
                    lat: curr.coords.latitude,
                    long: curr.coords.longitude
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setPickup(api.data.place);
                if (pickupRef.current != null) {
                    pickupRef.current.value = api.data.place
                }
                setride((prevride) => {
                    return {
                        ...prevride,
                        pickup: api.data.place
                    }
                })
            }, (error) => {
            }, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            })
        }
    }, [])

    const doLogout = async () => {
        await axios.get(`${import.meta.env.VITE_URI}/user/logout`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        navigate('/', {
            state: { logout: true }
        })
    }

    useEffect(() => {
        reciveMessage("reciveRideRequest", ({name, ride, IAmSocketId}) => {
            console.log("reciveRideRequest", name, ride, IAmSocketId);
            if(ride){
                console.log("reciveRideRequest conditon true", name, ride, IAmSocketId);
                setisConformRide(true);
                rideRef.current = {
                    ...ride,
                    captainName : name,
                }
                setride(rideRef.current);
            }
        })
    }, [socket])


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
                <form className='z-[999]'>
                    <button onClick={doLogout}
                        className='text-2xl absolute right-4 top-4 z-[999] font-bold' type='button'>Logout</button>
                </form>
                <div ref={mapRef} className="w-full h-screen fixed top-12 left-0 z-0" />
                <div
                    className='bg-transparent flex flex-col justify-end h-screen absolute top-0 w-full z-10' >
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
                                ref={pickupRef}
                                onClick={() => {
                                    setpannel(true)
                                    setactive("pickup")
                                }}
                                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                                type="text"
                                placeholder='Add a pick-up location'
                                onChange={(evt) => { setPickup(evt.target.value); setride({ ...ride, pickup: evt.target.value }); }}
                            // value={pickup}
                            />
                            <input
                                ref={destinationRef}
                                onClick={() => {
                                    setpannel(true)
                                    setactive("destination")
                                }}
                                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                                type="text"
                                onChange={(evt) => { setDestination(evt.target.value); setride({ ...ride, destination: evt.target.value }) }}
                                // value={destination}
                                placeholder='Enter your destination' />
                        </form>
                        <button
                            onClick={() => {
                                if (pickup && destination) {
                                    setvehicalPanal(true)
                                }
                                setfindtripBtn(true)

                            }}
                            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                            Find Trip
                        </button>
                    </div>
                    <div ref={pannelRef}  >
                        {/* <LocationPanel
                            suggestions={suggestions}
                            setpickup={setPickup}
                            setdestination={setDestination}
                            active={active}
                        /> */}
                    </div>
                    <div
                        onClick={() => {
                            setfindtripBtn(false)
                        }}
                        ref={vehicalRef} className='absolute z-50 bg-zinc-100 w-full h-0'>
                        <VehiclePanel
                            ridePanal={ridePanal}
                            setfindtripBtn={setfindtripBtn}
                            fares={fares}
                            setridePanal={setridePanal}
                            setvehicalPanal={setvehicalPanal} />
                    </div>
                    <div ref={conformRef} className='absolute z-50 bg-zinc-100 w-full h-0'>
                        <ConfirmRide
                            rideRef={rideRef}
                            setvehicalPanal={setvehicalPanal}
                            setridePanal={setridePanal}
                            setdriverPanal={setdriverPanal}
                            setlookingForDriverPanal={setlookingForDriverPanal}
                        />

                    </div>
                    <div ref={driverRef} className='absolute z-50 bg-zinc-100 w-full h-0'>
                        <LookingForDriver setdriverPanal={setdriverPanal} />
                    </div>
                    <div ref={conformRide} className='absolute z-50 bg-zinc-100 w-full h-0'>
                        <OtpSendToUser setIsConformRide={setisConformRide} ride={rideRef.current} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeMain
