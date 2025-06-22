import { useState } from "react";

const OtpSendToUser = ({ setIsConformRide, ride }) => {
  const [isSee, setIsSee] = useState(false)
  return (
    isSee ? (
      <div className="text-center text-lg font-semibold mb-3">
        Otp is
        <span className='text-2xl font-semibold text-green-600'> {ride?.otp} </span>
      </div>
    ) : (
      <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0'
          onClick={() => { setIsConformRide(false) }}
        ><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
        <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
          <div className='flex items-center gap-3 '>
            <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
            <h2 className='text-lg font-medium'>{ride?.captainName}</h2>
          </div>
          <h5 className='text-lg font-semibold'>{ride?.DistanceBtwnCapToPickup} KM</h5>
        </div>
        <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup}</p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
              <i className="ri-currency-line"></i>
              <div>
                <h3 className='text-lg font-medium'>fare</h3>
                <p className='text-sm -mt-1 text-gray-600'>{ride?.fare} Cash</p>
              </div>
            </div>
          </div>

          <div className='mt-6 w-full'>
            <form onSubmit={(e) => {
              e.preventDefault()
              setIsConformRide(false)
            }}>


              <button
                onClick={() => {
                  // setIsConformRide(true)
                  setIsSee(true)
                  setIsConformRide(false)
                }}
                type='submit' className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>

              <button
                onClick={() => {
                  // setIsConformRide(false)
                  setIsConformRide(false)
                }}
                className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>

            </form>
          </div>
        </div>
      </div>
    ));
}

export default OtpSendToUser;