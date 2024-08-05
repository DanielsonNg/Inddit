
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './LandingPage'
import LoginPage from '../components/LoginPage'
import RegisterPage from '../components/RegisterPage,'
import NotFound from '../components/NotFound'
import { useAuth } from '../context/AuthProvider'
// import RequireAuth from '../components/RequireAuth'
import TestPage from '../components/TestPage'

function App() {  
  const {isAuthenticated} = useAuth()
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={!isAuthenticated ? <LoginPage/> : <LandingPage />} />
      <Route path='/register' element={!isAuthenticated ? <RegisterPage/> : <LandingPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path='/test' element={isAuthenticated  ? <TestPage /> : <LoginPage />} />

      {/* <Route element={<RequireAuth />}>
        <Route path='/test' element={<TestPage />} />
      </Route> */}
        {/* <Route path='/users' element={<Users />} /> */}
    </Routes>
    </>
  )
}

export default App
