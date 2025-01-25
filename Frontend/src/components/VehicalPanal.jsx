import React, { useContext } from 'react'
import { RideCon } from '../context/RideContext'

const VehiclePanel = ({ className, setvehicalPanal, setridePanal, fares }) => {
    const { ride, setride } = useContext(RideCon)
    return (
        <div className={`${className}`}>
            <h5
                onClick={() => { setvehicalPanal(false) }}
                className='p-1 text-center right-0 absolute top-4'><i className="text-3xl text-zinc-900 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
            <div onClick={() => {
                setridePanal(true);
                setride({
                    ...ride,
                    fare: fares.car,
                    vehicleType: 'car',
                    vehicleImg: '/vehicles/car.jpg'
                });
            }} className='flex border-2 active:border-black  mb-2 rounded-xl w-full p-3  items-center justify-between'>
                <img className='h-10' src="/vehicles/car.jpg" alt="car" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away </h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{fares.car}</h2>
            </div>
            <div onClick={() => {
                setridePanal(true);
                setride({
                    ...ride,
                    fare: fares.moto,
                    vehicleType: 'moto',
                    vehicleImg: '/vehicles/moto.webp'
                });
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
                <img className='h-10' src="/vehicles/moto.webp" alt="moter" />
                <div className='-ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away </h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{fares.moto}</h2>
            </div>
            <div onClick={() => {
                setridePanal(true);
                setride({
                    ...ride,
                    fare: fares.auto,
                    vehicleType: 'auto',
                    vehicleImg: '/vehicles/auto.webp'
                });

            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
                <img className='h-10' src="/vehicles/auto.webp" alt="auto" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away </h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{fares.auto}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel