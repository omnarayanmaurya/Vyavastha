import React, { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import axios from "axios";
export const ShopContext = createContext()
const backend = import.meta.env.VITE_BACKEND_URL
const ShopContextProvider = ({ children }) => {
    const [task, setTask] = useState([])
    const [loading, setLoading] = useState(false)
    const backend = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()
    const location = useLocation()
    //Fetch all tasks
    const getTaskData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(backend + '/api/task/get')
            setTask(response.data.task)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    //create a new task
    const createTask = async (taskData) => {
        try {
            const response = await axios.post(backend + '/api/task/create', taskData)
            setTask((prev) => [response.data.task, ...prev])
            return response.data.task
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    const value = {
        navigate,
        location,
        task,
        loading,
        getTaskData,
        createTask,
        backend
    }
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider    
