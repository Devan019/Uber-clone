import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Auth from './components/auth'
import HomeMain from './pages/HomeMain'
import CaptainHome from './pages/CaptainHome'
import CaptainRiding from './pages/CaptainRiding'
import { useEffect } from 'react'
import Ride from './components/Ride'
function App() {

  const loadGoogleMapsScript = () => {
    if (window.google) return; 
    const script = document.createElement("script");
    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    window.initMap = () => {
      console.log("Google Maps Loaded");
    };

    loadGoogleMapsScript();
  }, []);


  return (
    <>
      <Routes>
        <Route path='/' element={
          <Home />
        } />
        <Route path='/home' element={
          <Auth>
            <HomeMain />
          </Auth>
        } />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-home' element={<CaptainHome />} />
        <Route path='/captain-ride' element={< CaptainRiding />} />
        <Route path='/ride' element={< Ride />} />
      </Routes>
    </>
  )
}

export default App
