
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
import IndditPage from './components/IndditPage'
import PostCreate from './components/PostCreate'
import LandingPageGuest from './components/LandingPageGuest'
import IndditPageGuest from './components/IndditPageGuest'
import ManageCommunity from './components/ManageCommunity'
import UserPage from './components/UserPage'

function App() {  
  const {isAuthenticated} = useAuth()
  return (
    <>
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={isAuthenticated ? <LandingPage /> : <LandingPageGuest/> } /> 
        <Route path='/post/:id' element={<Post />} />
        {/* <Route exact path="/inddit" render={() => (<IndditPage id={id} />)} /> */}
        <Route path='/inddit/:id' element={<IndditPage />} />
        <Route path='/inddit/guest/:id' element={<IndditPageGuest />} />
        <Route path='/post/create/:id' element={<PostCreate />} />
      </Route>
      <Route path='/login' element={!isAuthenticated ? <LoginPage/> : <LandingPage />} />
      <Route path='/register' element={!isAuthenticated ? <RegisterPage/> : <LandingPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path='/inddit/manage/:id' element={<ManageCommunity />} />
      <Route path= '/user/:id' element={<UserPage />} />
    </Routes>
    </>
  )
}

export default App
