import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const Login = () => {
const { token,setToken,logout } = useContext(AuthContext)

const { navigate, location, backend } = useContext(ShopContext)

const [currentState, setCurrentState] = useState('Login')
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')



const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {

        if (currentState === 'Sign Up') {

            const response = await axios.post(
                backend + '/api/user/register',
                {
                    username: name,
                    email,
                    password
                }
            )

            setToken(response.data.token)

            toast.success(response.data.message)

        } else {

            const response = await axios.post(
                backend + '/api/user/login',
                {
                    username: name,
                    password
                }
            )

            setToken(response.data.token)

            toast.success(response.data.message)
        }

        const from = location.state?.from?.pathname || '/'

        navigate(from, { replace: true })

    } catch (error) {

        console.log(error)

        toast.error(
            error.response?.data?.message || 'Something went wrong'
        )
    }
}
if(token){
        return(
            <button
            onClick={logout}
            className='bg-purple-600 text-white px-4 py-2 rounded-xl'>
            LogOut
            </button>
        )
    }
return (
    <form
        onSubmit={onSubmitHandler}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
        <div className="bg-black border border-purple-600 w-full sm:w-11/12 md:w-3/4 lg:w-1/3 h-auto rounded-4xl shadow-xl p-6">

            <div className="flex justify-center items-center border-b border-gray-200 pb-4 mb-5">
                <h2 className="text-2xl font-semibold text-white">
                    {currentState}
                </h2>
            </div>

            <div className="flex flex-col gap-4">

                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Enter Your Username"
                    required
                    className="bg-black text-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

                {currentState === 'Sign Up' && (
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Enter Your Email"
                        required
                        className="bg-black text-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                )}

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Enter Your Password"
                    required
                    className="bg-black text-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

                <div className="w-full flex justify-between text-sm mt-[-8px] text-white">

                    {currentState === 'Login' && (
                        <p className="cursor-pointer">
                            Forgot Your Password?
                        </p>
                    )}

                    <p
                        className="cursor-pointer"
                        onClick={() => setCurrentState(
                            currentState === 'Login' ? 'Sign Up' : 'Login'
                        )}
                    >
                        {currentState === 'Login'
                            ? 'Create Account'
                            : 'Already have an account? Login'}
                    </p>

                </div>
                <button
                    type="submit"
                    className="bg-purple-600 text-white rounded-xl w-fit px-4 py-2 font-semibold text-base self-center cursor-pointer"
                >
                    {currentState}
                </button>
            </div>
        </div>
    </form>
)
}
export default Login
