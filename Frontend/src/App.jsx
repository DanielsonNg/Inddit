
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage,'
import NotFound from './components/NotFound'
import { useAuth } from '../context/AuthProvider'
// import RequireAuth from '../components/RequireAuth'
import Post from './components/Post'
import RootLayout from './layouts/RootLayout'

function App() {  
  const {isAuthenticated} = useAuth()
  return (
    <>
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<LandingPage />} /> 
        <Route path='/post' element={<Post />} />
      </Route>
      <Route path='/login' element={!isAuthenticated ? <LoginPage/> : <LandingPage />} />
      <Route path='/register' element={!isAuthenticated ? <RegisterPage/> : <LandingPage />} />
      <Route path="*" element={<NotFound />} />
      {/* <Route path='/test' element={isAuthenticated  ? <TestPage /> : <LoginPage />} /> */}
      <Route path='/post/:id' element= {<Post />} />

      {/* <Route element={<RequireAuth />}>
        <Route path='/test' element={<TestPage />} />
      </Route> */}
        {/* <Route path='/users' element={<Users />} /> */}
    </Routes>
    </>
  )
}

export default App
