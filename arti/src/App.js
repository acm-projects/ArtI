import React from 'react'
import Header from './components/Header.js'
import HeaderTwo from './components/HeaderTwo.js'
import LoginForm from './components/LoginForm.js'
import Footer from './components/Footer.js'
import SignUp from './components/SignUp.js'
import ImageGen from './components/ImageGen.js'
import {BrowserRouter as Router, Route, Routes, Switch} from 'react-router-dom'
import PortraitGen from './components/PortraitGen.js'
import NavBar from './components/NavBar';
import MyBoards from './components/MyBoards';

const App = () => {
  return (
    <Router>
      <div className = 'container'>
       <NavBar/>

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
       <Route path='/imagegen' element={<ImageGen />} />
       <Route path='/portraitgen' element={<PortraitGen />} />
       </Routes>
      </div>
      </Router>
  )
}

export default App