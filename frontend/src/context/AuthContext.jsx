import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

const navigate = useNavigate()

// Authentication state
const [token, setToken] = useState(
    localStorage.getItem('token') || ''
)

// Logout function
const logout = () => {
    setToken('')
    toast.success('Logged out successfully')
    navigate('/login')
}

// Persist token in localStorage
useEffect(() => {
    if (token) {
        localStorage.setItem('token', token)
    } else {
        localStorage.removeItem('token')
    }
}, [token])

const value = {
    token,
    setToken,
    logout
}

return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
)

}

export default AuthContextProvider
