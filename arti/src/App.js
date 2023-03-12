import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginForm from './components/LoginForm.js'
import SignUp from './components/SignUp.js'
import ImageGen from './components/ImageGen.js'
import PortraitGen from './components/PortraitGen.js'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

const App = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setisLoggedIn] = useState(false)

  // Check if the user is logged in by getting their token
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) setisLoggedIn(true)

    if (isLoggedIn) navigate('/imagegen')
    else navigate('/')
  }, [navigate, isLoggedIn])

  return (
    <Container fluid className='main-container'>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/imagegen' element={<ImageGen />} />
        <Route path='/portraitgen' element={<PortraitGen />} />
      </Routes>
    </Container>
  )
}

export default App
