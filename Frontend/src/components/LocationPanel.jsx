import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { RideCon } from '../context/RideContext';

const LocationPanel = ({suggestions , active ,setpickup , setdestination }) => {
    
    const {ride,setride} = useContext(RideCon);
    console.log(ride)
    function setsuggestionOnActive(ele){
        if(active == "pickup"){
            setpickup(ele.target.innerText);
            setride({...ride,pickup:ele.target.innerText});
        }else if(active == "destination"){
            setdestination(ele.target.innerText);
            setride({...ride,destination:ele.target.innerText});
        }
    }
    
    return (
        <div className='mt-12'>
            {/* Display fetched suggestions */}
            {suggestions && suggestions.length > 0 ? suggestions.map((palces, idx) =>
                <div
                    onClick={setsuggestionOnActive}
                    key={idx} className=' flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                    <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                    <h4 className='font-medium'>{palces.place_name}</h4>
                </div>

            ) : <><h2>Nothing</h2></>}
        </div>
    )
}

export default LocationPanel

