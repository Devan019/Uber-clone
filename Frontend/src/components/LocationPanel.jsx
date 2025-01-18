import React, { useEffect, useState } from 'react'
import axios from 'axios'

const LocationPanel = ({vehicalPanal ,setvehicalPanal , setDestination , destination , setPickup , pickup}) => {
    const [randomPlaces , setRandomPlaces] = useState([
        "Room 101, 221B Baker Street, London, UK", 
        "Apt 5C, 123 Times Square, New York, USA",
        "Suite 204, 7 Eiffel Tower Avenue, Paris, France",
        "Flat 12B, 1 Sydney Opera Road, Sydney, Australia",
        "Room 8, 3 Mount Fuji Lane, Tokyo, Japan",
    ]);

    async function main() {
        const api = await axios.post(`${import.meta.env.VITE_URI}/map/auto`,{})
        const data = api.data;

        setRandomPlaces(data)
    }

    useEffect(()=>{
        
    } , [pickup,destination])
    
    return (
        <div className='mt-12'>
            {/* Display fetched suggestions */}
            {randomPlaces.map((palces,idx) => 
                 <div 
                 onClick={()=>{
                    setvehicalPanal(true)
                 }}
                 key={idx} className=' flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                    <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                    <h4 className='font-medium'>{palces}</h4>
                </div>
                
            )}
        </div>
    )
}

export default LocationPanel

