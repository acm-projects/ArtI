import Button from './Button'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

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
    localStorage.setItem('token', token)
  }

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <div className='form-control'>
        <input
          type='text'
          placeholder='username'
          onChange={handleChange}
          name='username'
          value={formData.username}
        />

        <input
          type='text'
          placeholder='password'
          onChange={handleChange}
          name='password'
          value={formData.password}
        />
      </div>

      <Button text='Log In.' />
    </form>
  )
}

export default LoginForm
