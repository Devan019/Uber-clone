import React, { useState , useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Toast from 'light-toast'
import axios from 'axios'

const CaptainLogin = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("signup")) {
      Toast.success("account sucessfully created", 500);
      localStorage.removeItem("signup")
    }
  })
  const [Captain, setCaptain] = useState({
    email: '',
    password: ''
  })
  return (

    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        <form onSubmit={async (e) => {
          e.preventDefault()
          Toast.loading("login process...")
          const api = await axios.post(`${import.meta.env.VITE_URI}/captains/login`, Captain);
          const data = await api.data;
          console.log(data);

          if (data.token) {
            localStorage.setItem("token" , data.token);
            localStorage.setItem("captainlogin" , true);
            localStorage.setItem("navigateCaptainLogin" , true);
            console.log("in")
            Toast.hide();
            navigate('/captain-home')
          }
          if(data.err){
            Toast.fail(data.message , 500)
          }
          setCaptain({ email: '', password: '' })
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={Captain.email}
            onChange={(evt) => {
              setCaptain({ ...Captain, email: evt.target.value })
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={Captain.password}
            onChange={(evt) => {
              setCaptain({ ...Captain, password: evt.target.value })
            }}
            required type="password"
            placeholder='password'
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>

        </form>
        <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin