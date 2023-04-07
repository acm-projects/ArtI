import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import LoginForm from './components/LoginForm.js'
import SignUp from './components/SignUp.js'
import ImageGen from './components/ImageGen.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PortraitGen from './components/PortraitGen.js'
import NavBar from './components/NavBar'
import MyBoards from './components/MyBoards'
import ProtectedRoutes from './utils/ProtectedRoutes.js'
import Profile from './components/Profile.js'
import ConditionalNavBar from './components/ConditionalNavBar'

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false) // to check if user is logged in
  const [user, setUser] = useState() // basic user information to be passed down to children as prop

  // TODO :: fix where dont need empty dependency array below
  // Check if the user is logged in by getting their token
  useEffect(() => {
    const userStorage = JSON.parse(sessionStorage.getItem('arti'))
    if (!userStorage) {
      setisLoggedIn(false)
    } else {
      setisLoggedIn(true)
      // TODO :: get user info by requesting from API
      handleUser(userStorage)
      console.log(user)
    }
  }, []) // DO NOT REMOVE THE ARRAY!, it will run useEffect multiple times

  // Gets basic user information
  async function handleUser(user) {
    try {
      const body = {
        token: user.token,
        username: user.username,
      }
      const response = await axios.post(`/api/v1/user/get`, body)
      setUser(await response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container fluid className='main-container'>
      <Router>
        <ConditionalNavBar viewportType='desktop-nav' />
        <main className='content'>
          <Routes>
            {/* Routes that does not require for user to be signed in  */}
            <Route
              path='/'
              element={
                <LoginForm
                  loggedIn={isLoggedIn}
                  setLoggedIn={setisLoggedIn}
                  setUser={setUser}
                />
              }
            />
            <Route
              path='/signup'
              element={
                <SignUp
                  loggedIn={isLoggedIn}
                  setLoggedIn={setisLoggedIn}
                  setUser={setUser}
                />
              }
            />

            {/* Routes that require for user to be signed in (authenticated) */}
            <Route element={<ProtectedRoutes auth={isLoggedIn} />}>
              <Route path='/imagegen' element={<ImageGen />} />
              <Route path='/portraitgen' element={<PortraitGen />} />
              <Route path='/myboards' element={<MyBoards user={user} />} />
              <Route
                path='/myprofile'
                element={<Profile user={user} />}
              ></Route>
            </Route>
          </Routes>
        </main>

        <ConditionalNavBar viewportType='mobile-nav' />
      </Router>
    </Container>
  )
}

export default App
