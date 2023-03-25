import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import girl from './assets/girl.png'

import {
  Col,
  Row,
  Form,
  InputGroup,
  Button,
  FloatingLabel,
} from 'react-bootstrap'

const LoginForm = ({ loggedIn, setLoggedIn, setUser }) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loginStatus, setLoginStatus] = useState('')

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    if (loggedIn) navigate('/imagegen')
  })

  // TODO :: go back to previous route if already logged in to prevent user from logging in again
  // -- find a way to return to previous route

  // Updates the username and password states
  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  // Submitting a form will POST username and password to API and API gives a token & username when logged in
  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const response = await axios.post('/api/v1/auth', {
        username: formData.username,
        password: formData.password,
      })
      if (response.status === 200) {
        console.log(response.data.data)
        storeUser(response.data.data)
        setLoginStatus('Logged in successfully!')
        setLoggedIn(true)
        setUser(
          handleUser({ token: response.data.data, username: formData.username })
        )

        // immediately goes to imagegen after loggin in
        navigate('/imagegen')
      }
    } catch (error) {
      if (error.response.status === 400)
        // not everything was filled out
        setLoginStatus('Please fill in the required fields')
      else if (error.response.status === 401)
        // Unauthorized
        setLoginStatus('Invalid Username or Password')
      else {
        setLoginStatus('Something went wrong')
        console.log(error.message)
      }
    }
  }

  // Gets basic user information and passes back to parent component (App.js)
  async function handleUser(basicUserInfo) {
    try {
      const body = {
        token: basicUserInfo.token,
        username: basicUserInfo.username,
      }
      const response = await axios.post('/api/v1/user/get', body)
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  function storeUser(userData) {
    if (!userData.token) return
    sessionStorage.setItem('arti', JSON.stringify(userData))
  }

  // toggles the state of showPassword
  const togglePassword = () => {
    setShowPassword((current) => !current)
  }

  return (
    <Row className='login-container'>
      <Col sm='6' className=' side-column'>
        <div className='side-container'>
          <h1>
            <em>Welcome</em>
          </h1>
          <h1>
            <em>to</em>
          </h1>
          <h1>
            ART<em>i</em>
          </h1>
        </div>
      </Col>
      <Col sm='6'>
        <div className='side-container'>
          <h1>Sign In</h1>
          {/* <form className='login-form' onSubmit={handleSubmit}>
            <div className='login-form-control'>
              <input
                className='login-input'
                type='text'
                placeholder='username'
                onChange={handleChange}
                name='username'
                value={formData.username}
              />
              <input
                className='login-input'
                type='password'
                placeholder='password'
                onChange={handleChange}
                name='password'
                value={formData.password}
              />
            </div>

            <Button text='Log In.' />
            <button className='login-btn'>Log In</button>
          </form> */}

          <Form className='my-3 w-75' onSubmit={handleSubmit}>
            {/* USERNAME INPUT */}
            <FloatingLabel
              className='mb-3'
              label='Username'
              controlId='usernameInput'
            >
              <Form.Control
                className='login-input'
                placeholder='Username'
                onChange={handleChange}
                name='username'
              />
            </FloatingLabel>

            {/* PASSWORD INPUT */}
            <InputGroup className='mb-3'>
              <FloatingLabel label='Password' controlId='passwordInput'>
                <Form.Control
                  className='login-input'
                  // The showPassword state lets the input to toggle the visibility of the text
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  name='password'
                  onChange={handleChange}
                />
              </FloatingLabel>
              <Button
                variant='secondary'
                className='toggle-password-btn'
                onClick={togglePassword}
              >
                <i
                  // inside the className is what toggles the icon for the button
                  className={
                    showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'
                  }
                ></i>
              </Button>
            </InputGroup>

            <Button
              variant='secondary'
              type='submit'
              className='login-btn w-100'
            >
              Log In
            </Button>

            {/* Login Status */}
            <div
              className={`my-2 text-center ${
                loginStatus === 'Logged in successfully!'
                  ? 'text-success'
                  : 'text-danger'
              }`}
            >
              <p>{loginStatus}</p>
            </div>
          </Form>

          {/* Footer */}
          <footer>
            <Link to='/signup'>New to ArtI? Sign Up.</Link>
          </footer>
        </div>
      </Col>
    </Row>
  )
}

export default LoginForm
