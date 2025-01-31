import React, {  useContext, useEffect, useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import { CreateUserContext } from '../context/UserContext'
import Toast from 'light-toast';

const UserLogin = () => {
  useEffect(()=>{
    if(localStorage.getItem("signup")){
      Toast.success("account sucessfully created" , 1000);
      localStorage.removeItem("signup")
      
    }
  })
  const navigate = useNavigate()
  const [user, setuser] = useState({
    email: '',
    password: '',
  })

  // console.log(globalUser,setglobaluser)
  
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

        <form onSubmit={async(e) => {
            e.preventDefault();
            Toast.loading("login process...")
            const api = await axios.post(`${import.meta.env.VITE_URI}/user/login` , user);
            const data = await api.data;
            console.log(data)
            if(data.token){
              localStorage.setItem("token" , data.token);
              localStorage.setItem("login" , true);
              localStorage.setItem("navigateUserLogin" , true);
              Toast.hide();
              navigate('/home')
            }
            if(data.err){
              Toast.fail(data.message , 500)
            }
            setuser({
              email : '',
              password : ''
            })
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            value={user.email}
            onChange={(evt) => {
              setuser({...user , email : evt.target.value})
            }}
            required
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
          value={user.password}
          onChange={(evt) => {
            setuser({...user , password : evt.target.value})
          }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            required type="password"
            placeholder='password'
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>

        </form>
        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
      </div>
      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin