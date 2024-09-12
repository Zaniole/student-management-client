import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'

const PrivateRoutes = () => {
  const isAuthenticated = localStorage.getItem('valid');

  return isAuthenticated ? (
    <Outlet/>
  ):(
    <Navigate to="/" replace/> 
  )
}

export default PrivateRoutes