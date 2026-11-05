import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-2">
      <img src={logo} alt="Logo" className="h-15 w-auto" />
    </nav>
  )
}

export default Navbar