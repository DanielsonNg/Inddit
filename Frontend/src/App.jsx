
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './LandingPage'
import LoginPage from '../components/LoginPage'
import RegisterPage from '../components/RegisterPage,'
import NotFound from '../components/NotFound'
import RequireAuth from '../components/RequireAuth'
import TestPage from '../components/TestPage'
import Users from '../components/Users'

function App() {  
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path="*" element={<NotFound />} />

      <Route element={<RequireAuth />}>
        <Route path='/test' element={<TestPage />} />
        <Route path='/users' element={<Users />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
