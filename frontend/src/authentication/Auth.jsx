import React from 'react'
import { Navigate } from 'react-router-dom'

function Auth({child}){
    const token = localStorage.getItem("token")
  return token? child : <Navigate to= '/signin'/>
}

export default Auth


