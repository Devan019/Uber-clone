import React, { useState } from 'react'
import { Link , Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
const UserSignup = () => {
  const navigate = useNavigate()
  const [user, setuser] = useState({
    fullname : {
      fname : '',
      lname : '',
    },
    email : '',
    password : ''
  })
  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

          <form onSubmit={async(e) => {
            e.preventDefault()
            // submitHandler(e)
            Toast.loading("signup process...")
            const api = await axios.post(`${import.meta.env.VITE_URI}/user/register` , user);
            const data = await api.data;
            if(data.Token){
              localStorage.setItem("signup" , true)
              navigate("/login");
            }
          }}>

            <h3 className='text-lg w-1/2  font-medium mb-2'>What's your name</h3>
            <div className='flex gap-4 mb-7'>
              <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='First name'
                value={user.fullname.fname}
                onChange={(evt)=>{
                  setuser({...user , fullname : {
                    ...user.fullname,
                    fname : evt.target.value
                  }})
                }}
              />
              <input
                required
                className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='Last name'
                value={user.fullname.lname}
                onChange={(evt)=>{
                  setuser({...user , fullname : {
                    ...user.fullname,
                    lname : evt.target.value
                  }})
                }}
              />
            </div>

            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input
              required
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              type="email"
              placeholder='email@example.com'
              value={user.email}
              onChange={(evt)=>{
                setuser({...user , email : evt.target.value})
              }}
            />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

            <input
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              value={user.password}
              onChange={(evt)=>{
                setuser({...user , password : evt.target.value})
              }}
              required type="password"
              placeholder='password'
            />

            <button
            type='submit'
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Create account</button>

          </form>
          <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    </div >
  )
}

export default UserSignup