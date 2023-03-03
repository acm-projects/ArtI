import Header from './components/Header.js'
import HeaderTwo from './components/HeaderTwo.js'
import LoginForm from './components/LoginForm.js'
import Footer from './components/Footer.js'
import SignUp from './components/SignUp.js'
import {BrowserRouter as Router, Route} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div className = 'container'>
       <Header />
       <HeaderTwo />
       <LoginForm />
       <Footer />
       <SignUp /> 
      </div>
      </Router>
  )
}

//Routing Issue: things disappearing when putting route path
//For now, SignUp is direct embed

export default App
