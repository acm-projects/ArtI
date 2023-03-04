import './App.css';
import Header from './components/Header.js'
import HeaderTwo from './components/HeaderTwo.js'
import LoginForm from './components/LoginForm.js'
import Footer from './components/Footer.js'
import SignUpForm from './components/SignUpForm.js'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div className = 'app'>
        <Routes>
        <Route path='/' element={
          <>
           <Header />
           <HeaderTwo />
           <LoginForm />
           <Footer />
          </>
        }
        />
       <Route path='/SignUpForm' element={<SignUpForm/>} />
       </Routes>
      </div>
      </Router>
  )
}


export default App
