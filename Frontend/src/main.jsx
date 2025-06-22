import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import 'remixicon/fonts/remixicon.css';
import RideContext from './context/RideContext.jsx'
import SocketContext from './context/SocketContext.jsx'
import CaptainContextProvider from './context/CaptainContext.jsx'


createRoot(document.getElementById('root')).render(
  <SocketContext>
    <CaptainContextProvider>
      <RideContext>
        <UserContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContext>
      </RideContext>
    </CaptainContextProvider>
  </SocketContext>
)
