import Button from './Button'

const LoginForm = () => {
  return (
    <form className = 'login-form' >
      <div className = 'form-control'>
        <input type= 'text' placeholder= 'username' />
      </div>
      <div className = 'form-control'>
        <input type= 'text' placeholder= 'password' />
      </div>

      <Button text = 'Log In.' />
    </form>
  )
}

export default LoginForm