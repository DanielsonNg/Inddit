
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './LandingPage'
import LoginPage from '../components/LoginPage'
import RegisterPage from '../components/RegisterPage,'
import NotFound from '../components/NotFound'


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
