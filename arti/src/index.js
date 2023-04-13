import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App'
import { ThemeProvider } from 'react-bootstrap'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // Turning off StrictMode because it keeps callin useEffect() twice leading to duplicating API calls
  // <React.StrictMode>
  <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint='xxs'
  >
    <App />
  </ThemeProvider>
  // </React.StrictMode>
)
