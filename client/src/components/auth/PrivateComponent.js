import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function PrivateComponent() {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('token')
  return (
   isLoggedIn ? <Outlet />:navigate('/auth')
  )
}

export default PrivateComponent