import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CaptainContext from '../context/CaptainContext' 
const CaptainSignup = () => {
  const {Captain, setCaptain} = useContext(CaptainContext)
  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        <form onSubmit={async (e) => {
          //   submitHandler(e)
          e.preventDefault();
          const api = await axios.post(`${import.meta.env.VITE_URI}/captain/register`, Captain);
          const data = await api.data;
          console.log(data);
          if (data.Token) {
            localStorage.setItem("captainSignup", true);
            navigate("/captain-login");
          }
          if(data.err){
            Toast.fail(data.message , 500)
          }

        }}>

          <h3 className='text-lg w-full  font-medium mb-2'>What's our Captain's name</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              placeholder='First name'
              value={Captain.fullname.fname}
              onChange={(evt) => {
                setCaptain({
                  ...Captain, fullname: {
                    ...Captain.fullname,
                    fname: evt.target.value,
                  }
                })
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              placeholder='Last name'
              value={Captain.fullname.lname}
              onChange={(evt) => {
                setCaptain({
                  ...Captain, fullname: {
                    ...Captain.fullname,
                    lname: evt.target.value,
                  }
                })
              }}
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
          <input
            required
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            value={Captain.email}
            onChange={(evt) => {
              setCaptain({ ...Captain, email: evt.target.value })
            }}
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            required type="password"
            placeholder='password'
            value={Captain.password}
            onChange={(evt) => {
              setCaptain({ ...Captain, password: evt.target.value })
            }}
          />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={Captain.Vehicle.color}
              onChange={(evt) => {
                setCaptain({
                  ...Captain, Vehicle: {
                    ...Captain.Vehicle,
                    color: evt.target.value
                  }
                })
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={Captain.Vehicle.plate}
              onChange={(evt) => {
                setCaptain({
                  ...Captain, Vehicle: {
                    ...Captain.Vehicle,
                    plate: evt.target.value
                  }
                })
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={Captain.Vehicle.capacity}
              onChange={(evt) => {
                setCaptain({
                  ...Captain, Vehicle: {
                    ...Captain.Vehicle,
                    capacity: evt.target.value
                  }
                })
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={Captain.Vehicle.type}
              onChange={(evt) => {
                setCaptain({
                  ...Captain, Vehicle: {
                    ...Captain.Vehicle,
                    type: evt.target.value
                  }
                })
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Create Captain Account</button>

        </form>
        <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignup