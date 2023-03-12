import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'react-bootstrap'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint='xxs'
      >
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
