import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CreateUserContext } from '../context/UserContext'
import Toast from 'light-toast'
import axios from 'axios'

const Home = () => {
  const { user } = useContext(CreateUserContext)
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    if (localStorage.getItem("login")) {
      Toast.success("welcome to UBER!", 500)
      localStorage.removeItem("login");

    } else if (localStorage.getItem("captainLogin")) {
      Toast.success("welcome to UBER!", 500)
      localStorage.removeItem("captainLogin");

    }
  })

  useEffect(() => {
    if (localStorage.getItem("navigateUserLogin") && !data) {
      navigate("/captain-home")
    }

    if (localStorage.getItem("navigateUserLogin") && !data) {
      navigate("/home")
    }
  }, [])



  return (
    <div className='flex flex-col justify-between h-screen relative'>
      <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" className='w-1/2' alt="" />
      <div className='flex justify-center items-center'>
        <img src="https://images.unsplash.com/photo-1631212846570-b8832855296a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZmZpYyUyMHNpZ25hbHxlbnwwfHwwfHx8MA%3D%3D" className='opacity-90 fixed top-0 -z-10 h-3/4 w-full' alt="" />
      </div>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-center'>Get Start with Uber</h1>
        <Link to={'/login'} className='flex w-4/5 m-auto rounded-lg justify-center items-center mt-2 p-4 bg-black text-white'>Continue</Link>
      </div>
    </div>
  )
}

export default Home