import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ShopContext } from '../context/ShopContext'
import logo from '../assets/logo.png'

const Navbar = () => {
const { token, logout } = useContext(AuthContext)
const { navigate } = useContext(ShopContext)

return (
    <nav className="flex items-center justify-between px-6 py-2">

        <img src={logo} alt="Logo" className="h-15 w-auto" />

        {token ? (
            <button 
            onClick={logout}
            className='btn bg-purple-600 hover:bg-purple-700 text-white font-medium py-1 px-4 rounded-xl transition'>
                Logout
            </button>
        ) : (
            <button 
            onClick={() => navigate('/login')}
            className='btn bg-purple-600 hover:bg-purple-700 text-white font-medium py-1 px-4 rounded-xl transition'>
                Login
            </button>
        )}

    </nav>
)

}

export default Navbar
