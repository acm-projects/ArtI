import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import LoginForm from './components/LoginForm.js'
import SignUp from './components/SignUp.js'
import ImageGen from './components/ImageGen.js'
import PortraitGen from './components/PortraitGen.js'
import ProtectedRoutes from './utils/ProtectedRoutes.js'

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false) // to check if user is logged in

  // Check if the user is logged in by getting their token
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) setisLoggedIn(false)
    else setisLoggedIn(true)
  }, [isLoggedIn, setisLoggedIn])

  return (
    <Container fluid className='main-container'>
      <Router>
        <Routes>
          {/* Routes that does not require for user to be signed in  */}
          <Route path='/' element={<LoginForm loggedIn={isLoggedIn} />} />
          <Route path='/signup' element={<SignUp />} />

          {/* Routes that require for user to be signed in (authenticated) */}
          <Route element={<ProtectedRoutes auth={isLoggedIn} />}>
            <Route path='/imagegen' element={<ImageGen />} />
            <Route path='/portraitgen' element={<PortraitGen />} />
          </Route>
        </Routes>
      </Router>
    </Container>
  )
}

export default App
