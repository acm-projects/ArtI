import Button from './Button'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    cpassword: '',
  })

  console.log(formData)

  function handleChange(event) {
    // const {name, value, type, checked} = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log(formData)

    if (formData.password === formData.cpassword) {
      console.log('Successfully signed up!')
    } else {
      console.log('Passwords do not match.') //if passwords do not match, cannot sign up
      return
    }
    console.log('submitted')
  }

  return (
    <form className='signup-form' onSubmit={handleSubmit}>
      <div className='form-control'>
        <input
          type='email'
          placeholder='email address'
          onChange={handleChange}
          name='email'
          value={formData.email}
        />

        <input
          type='firstname'
          placeholder='first name'
          onChange={handleChange}
          name='firstname'
          value={formData.firstname}
        />

        <input
          type='lastname'
          placeholder='last name'
          onChange={handleChange}
          name='lastname'
          value={formData.lastname}
        />

        <input
          type='username'
          placeHolder='username'
          onChange={handleChange}
          name='username'
          value={formData.username}
        />

        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          name='password'
          value={formData.password}
        />

        <input
          type='password'
          placeholder='confirm password'
          onChange={handleChange}
          name='cpassword'
          value={formData.cpassword}
        />

        <Button text='Sign Up.' />

        <Link to='/'>Go Back</Link>
      </div>
    </form>
  )
}

export default SignUp
