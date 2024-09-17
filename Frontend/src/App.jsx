
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

function App() {  
  const {isAuthenticated} = useAuth()
  return (
    <>
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<LandingPage />} /> 
        <Route path='/post' element={<Post />} />
        {/* <Route exact path="/inddit" render={() => (<IndditPage id={id} />)} /> */}
        <Route path='/inddit/:id' element={<IndditPage />} />
        <Route path='/post/create/:id' element={<PostCreate />} />
      </Route>
      <Route path='/login' element={!isAuthenticated ? <LoginPage/> : <LandingPage />} />
      <Route path='/register' element={!isAuthenticated ? <RegisterPage/> : <LandingPage />} />
      <Route path="*" element={<NotFound />} />
      {/* <Route path='/post/:id' element= {<Post />} /> */}
     

      {/* <Route element={<RequireAuth />}>
        <Route path='/test' element={<TestPage />} />
      </Route> */}
        {/* <Route path='/users' element={<Users />} /> */}
    </Routes>
    </>
  )
}

export default App
