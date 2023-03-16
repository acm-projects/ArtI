import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = (auth) => {
  return auth ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectedRoutes
