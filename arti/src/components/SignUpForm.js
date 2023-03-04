import {Link} from 'react-router-dom'
import Button from './Button'

const SignUpForm = () => {
  return (
    <form className = 'signup-form'>
      <h1>Sign Up.</h1>

    <div className = 'signup-form-control'>
      <input type = 'text' placeholder = 'first name'/>
      </div>

      <div className = 'signup-form-control'>
      <input type = 'text' placeholder = 'last name'/>
      </div>

      <div className = 'signup-form-control'>
      <input type = 'text' placeholder = 'e-mail'/>
      </div>

      <div className = 'signup-form-control'>
      <input type = 'text' placeholder = 'username'/>
      </div>

      <div className = 'signup-form-control'>
      <input type = 'text' placeholder = 'password'/>
      </div>

      <Button text = 'Sign Up.' />
      <Link to='/'>Go Back</Link>
    </form>
  
  )
}

export default SignUpForm

