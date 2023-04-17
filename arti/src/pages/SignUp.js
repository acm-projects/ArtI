// import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Row, Button, Col } from 'react-bootstrap'
import axios from 'axios'
import { handleUser, storeUser } from '../utils/Auth'

const SignUp = ({ loggedIn, setLoggedIn, setUser }) => {
  const navigate = useNavigate()
  const [status, setStatus] = useState({ message: '', type: null })
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    cpassword: '',
  })

  useEffect(() => {
    if (loggedIn) navigate('/imagegen')
  })

  function handleChange(event) {
    // const {name, value, type, checked} = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
    if (formData.password !== formData.cpassword)
      setStatus({ message: 'Passwords do not match', type: 'password' })
    else setStatus({ message: 'Looks good!', type: 'password' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    console.log(formData)

    const defaultBoard = 'Saved Images'

    const body = {
      username: formData.username,
      email: formData.email,
      password: formData.cpassword,
      firstName: formData.firstname,
      lastName: formData.lastname,
      settings: {
        defaultBoard: defaultBoard,
      },
    }

    try {
      const response = await axios.post('/api/v1/user/', body)
      console.log(response)
      if (response.status === 200) {
        // a successful sign up leads to user getting logged in as well
        const auth = await axios.post('/api/v1/auth', {
          username: formData.username,
          password: formData.password,
        })
        if (auth.status === 200) {
          // stores user in sessionStorage for easy access
          storeUser(auth.data.data)
          // Sets the loggedIn prop (a state in App.js) to true
          setLoggedIn(true)
          // Allows App.js to have data of user
          setUser(
            handleUser({
              token: response.data.data,
              username: formData.username,
            })
          )

          // Creates the default board for new user
          await axios.post('/api/v1/boards/', {
            username: body.username,
            boardName: defaultBoard,
          })

          // immediately goes to imagegen after logging in
          navigate('/imagegen')
        }
      }
    } catch (error) {
      if (error.response) {
        setStatus({ message: error.response.data.message })
      } else console.log(error.message)
    }

    // if (formData.password === formData.cpassword) {
    //   console.log('Successfully signed up!')
    // } else {
    //   console.log('Passwords do not match.') //if passwords do not match, cannot sign up
    //   return
    // }
    // console.log('submitted')
  }

  return (
    <>
      <Row className='signup-container my-auto'>
        <Col>
          <form className='signup-form' onSubmit={handleSubmit}>
            <div className='form-ctrl'>
              
              <h2 className = "main-signup-caption">Sign Up.</h2>
              <h3 className = "signup-caption">Welcome to Arti. Please enter in your details below.</h3>

              <h4 className = "signup-subtitles"> E-mail* </h4>
              <div className='form-floating input-wrapper'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='email address'
                  onChange={handleChange}
                  name='email'
                  id='email'
                  value={formData.email}
                  required
                />
                <label htmlFor='email'>email address</label>
              </div>

              <h4 className = "signup-subtitles">First Name*</h4>
              <div className='form-floating input-wrapper'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='first name'
                  onChange={handleChange}
                  name='firstname'
                  id='firstname'
                  value={formData.firstname}
                  required
                />
                <label htmlFor='firstname'>first name</label>
              </div>

              <h4 className = "signup-subtitles">Last Name*</h4>
              <div className='form-floating input-wrapper'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='last name'
                  onChange={handleChange}
                  name='lastname'
                  id='lastname'
                  value={formData.lastname}
                  required
                />
                <label htmlFor='lastname'>last name</label>
              </div>

              <h4 className = "signup-subtitles">Username*</h4>
              <div className='form-floating input-wrapper'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='username'
                  onChange={handleChange}
                  name='username'
                  id='username'
                  value={formData.username}
                  required
                />
                <label htmlFor='username'>username</label>
              </div>

              <h4 className = "signup-subtitles">Password*</h4>
              <div className='form-floating input-wrapper'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='password'
                  onChange={handleChange}
                  name='password'
                  id='password'
                  value={formData.password}
                  required
                />
                <label htmlFor='password'>password</label>
              </div>

              <h4 className = "signup-subtitles">Confirm Password*</h4>
              <div className='form-floating input-wrapper'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='confirm password'
                  onChange={handleChange}
                  name='cpassword'
                  id='cpassword'
                  value={formData.cpassword}
                  required
                />
                <label htmlFor='cpassword'>confirm password</label>
              </div>

              {/* <Button
              text="Sign Up."
              style={{ backgroundColor: "#9d9d9d", borderRadius: "50px" }}
            /> */}
              <p
                className={`${
                  status.message === 'Looks good!'
                    ? 'text-success'
                    : 'text-danger'
                }`}
              >
                {status.message}
              </p>
              <div className='input-wrapper'>
                <Button variant='secondary' type='submit' className='login-btn'>
                  Sign Up
                </Button>
              </div>

              <Link to='/'>Go Back</Link>
            </div>
          </form>
        </Col>
      </Row>
    </>
  )
}

export default SignUp
