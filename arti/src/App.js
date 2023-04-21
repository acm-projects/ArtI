import { createContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import LoginForm from './pages/LoginForm.js'
import SignUp from './pages/SignUp.js'
import ImageGen from './pages/ImageGen.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PortraitGen from './pages/PortraitGen.js'
import MyBoards from './pages/MyBoards.js'
import ProtectedRoutes from './utils/ProtectedRoutes.js'
import Profile from './pages/Profile.js'
import ConditionalNavBar from './components/ConditionalNavBar'

export const UserAndBoardContext = createContext()

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false) // to check if user is logged in
  const [user, setUser] = useState() // basic user information to be passed down to children as prop
  const [boards, setBoards] = useState([])

  const valuesToPass = {
    user,
    setUser,
    boards,
    setBoards,
  }

  // Check if the user is logged in by getting their token
  useEffect(() => {
    const userStorage = JSON.parse(sessionStorage.getItem('arti'))
    if (!userStorage) {
      setisLoggedIn(false)
    } else {
      setisLoggedIn(true)
      handleUser(userStorage)
    }
  }, [isLoggedIn]) // DO NOT REMOVE THE ARRAY!, it will run useEffect multiple times

  // Gets basic user information
  async function handleUser(user) {
    try {
      const body = {
        token: user.token,
        username: user.username,
      }
      const response = await axios.post(`/api/v1/user/get`, body)
      await setUser(await response.data)
      setBoards(await handleBoards(user))
    } catch (error) {
      console.log(error)
    }
  }

  async function handleBoards(user) {
    try {
      const response = await axios.get(`/api/v1/boards/${user.username}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container fluid className='main-container'>
      <UserAndBoardContext.Provider value={valuesToPass}>
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
                <Route path='/myboards' element={<MyBoards />} />
                <Route
                  path='/myprofile'
                  element={<Profile setIsLoggedIn={setisLoggedIn} />}
                ></Route>
              </Route>
            </Routes>
          </main>

          <ConditionalNavBar viewportType='mobile-nav' />
        </Router>
      </UserAndBoardContext.Provider>
    </Container>
  )
}

export default App
