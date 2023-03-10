import Header from './components/Header.js'
import HeaderTwo from './components/HeaderTwo.js'
import LoginForm from './components/LoginForm.js'
import Footer from './components/Footer.js'
import SignUp from './components/SignUp.js'
import ImageGen from './components/ImageGen.js'
import { Route, Routes, useNavigate } from 'react-router-dom'
import PortraitGen from './components/PortraitGen.js'
import { useEffect, useState } from 'react'

const App = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setisLoggedIn] = useState(false)

  // Check if the user is logged in by getting their token
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) setisLoggedIn(true)

    if (isLoggedIn) navigate('/imagegen')
    else navigate('/')
  }, [navigate, isLoggedIn])

  return (
    <div className='container'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header />
              <HeaderTwo />
              <LoginForm />
              <Footer />
            </>
          }
        />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/imagegen' element={<ImageGen />} />
        <Route path='/portraitgen' element={<PortraitGen />} />
      </Routes>
    </div>
  )
}

export default App
