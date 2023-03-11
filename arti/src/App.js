import './App.css';
import Header from './components/Header.js'
import HeaderTwo from './components/HeaderTwo.js'
import LoginForm from './components/LoginForm.js'
import Footer from './components/Footer.js'
import SignUp from './components/SignUp.js'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PortraitGen from './components/PortraitGen.js'

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
       <Route path='/signup' element={<SignUp />} />
       </Routes>
      </div>
      </Router>
  )
}

export default App
