import Button from './Button'
import { useState } from 'react'

const LoginForm = () => {

  const [formData, setFormData] = useState({
    username: "", password: ""
  })

  console.log(formData)

  function handleChange(event) {
    setFormData(prevFormData => {

      return {
        ...prevFormData,
        [event.target.name]: event.target.value

      }
    })
    
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    console.log(formData)
    console.log("submitted")
  }
  return (
    <form 
    className = 'login-form' 
    onSubmit={handleSubmit}
    >

      <div className = 'form-control'>
        <input 
        type = 'text' 
        placeholder = 'username'
        onChange = {handleChange}
        name = "username"
        value = {formData.username}
         />


        <input 
        type = 'text' 
        placeholder = 'password'
        onChange = {handleChange}
        name = "password"
        value = {formData.password}
        />

      </div>

      <Button text = 'Log In.' />
    </form>
  )
}

export default LoginForm
