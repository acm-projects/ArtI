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
      console.log("Successfully signed up!")
    } else {
      console.log('Passwords do not match.') //if passwords do not match, cannot sign up
      return
    }
    console.log('submitted')
  }

  
  
  return (
    <form className = 'signup-form' onSubmit = {handleSubmit} >
    <div className = 'form-control'>

      <h2>Sign Up.</h2>
      
      <div className = "input-wrapper">
      <input
      type = 'email'
      placeholder = 'email address'
      onChange = {handleChange}
      name = "email"
      value = {formData.email}
      />
      </div>
      
      <div className = "input-wrapper">
      <input
      type = 'text'
      placeholder = 'first name'
      onChange = {handleChange}
      name = "firstname"
      value = {formData.firstname}
      />
      </div>
      
      <div className = "input-wrapper">
      <input
      type = 'text'
      placeholder = 'last name'
      onChange = {handleChange}
      name = "lastname"
      value = {formData.lastname}
      />
      </div>

      <div className = "input-wrapper">
      <input
      type = 'text'
      placeHolder = 'username'
      onChange = {handleChange}
      name = "username"
      value = {formData.username}
      />
      </div>

      <div className = "input-wrapper">
      <input
      type = 'text'
      placeholder = 'password'
      onChange = {handleChange}
      name = "password"
      value = {formData.password}
      />
      </div>
      
      <div className = "input-wrapper">
      <input
      type = 'text'
      placeholder = 'confirm password'
      onChange = {handleChange}
      name = "cpassword"
      value = {formData.cpassword}
      />
      </div>



      <Button text='Sign Up.' style={{ backgroundColor: '#9d9d9d', borderRadius: '50px' }} />

        <Link to='/'>Go Back</Link>
      </div>
    </form>
  )
}

export default SignUp
