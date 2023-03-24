import Button from './Button'
import { useState } from 'react'
import girl from './assets/girl.png';

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
    <div className="login-form-container">
    <form className = 'login-form' onSubmit={handleSubmit}>

      <div className = 'form-control'>

        <div className="input-wrapper">
        <input 
        type = 'text' 
        placeholder = 'username'
        onChange = {handleChange}
        name = "username"
        value = {formData.username}
         />
         </div>


         <div className="input-wrapper">
        <input 
        type = 'text' 
        placeholder = 'password'
        onChange = {handleChange}
        name = "password"
        value = {formData.password}
        />
        </div>
      </div>

      <Button text='Log In.' style={{ backgroundColor: '#9d9d9d', borderRadius: '50px' }} />
    </form>

    <div className = "image-container">
      <img src={girl} alt="girl" className="login-image" />
      </div>
      
    </div>

    


  )
}

export default LoginForm