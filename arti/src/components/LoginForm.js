// import Button from './Button'
import { useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  Col,
  Row,
  Form,
  InputGroup,
  Button,
  FloatingLabel,
} from 'react-bootstrap'

const LoginForm = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  // Updates the username and password states
  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  // Submitting a form will POST username and password to API and API gives a token when logged in
  async function handleSubmit(event) {
    event.preventDefault()
    console.log(formData)

    try {
      const response = await axios.post('/api/v1/auth', {
        username: formData.username,
        password: formData.password,
      })
      if (response.status === 200) {
        storeToken(response.data.data)
        navigate('/imagegen')
      }
    } catch (error) {
      console.log(error.message)
    }

    console.log('submitted')
  }

  function storeToken(token) {
    if (!token) return
    sessionStorage.setItem('token', token)
  }

  // toggles the state of showPassword
  const togglePassword = () => {
    setShowPassword((current) => !current)
  }

  return (
    <Row className='login-container'>
      <Col sm='6'>
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
                  className={showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'}
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
          </Form>
        </div>
      </Col>
    </Row>
  )
}

export default LoginForm
