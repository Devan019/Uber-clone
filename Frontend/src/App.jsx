import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Auth from './components/auth'
import HomeMain from './components/HomeMain'
function App() {

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
      </Routes>
    </>
  )
}

export default App
