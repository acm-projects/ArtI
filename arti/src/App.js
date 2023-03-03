import Header from './components/Header.js'
import HeaderTwo from './components/HeaderTwo.js'
import LoginForm from './components/LoginForm.js'

const App = () => {
  return (
      <div className = 'container'>
        <Header />
        <HeaderTwo />
        <LoginForm />
      </div>
  )
}

//either this or the one embedded in form,,waiting for reply
//will do layout/formatting when CSS week hits (I think)

export default App
