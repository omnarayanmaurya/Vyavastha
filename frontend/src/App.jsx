import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Task from './pages/Task'
import Home from './pages/Home'
import Inbox from './pages/Inbox'
import Calendar from './pages/Calendar'
import Activity from './pages/Activity'
import Settings from './pages/Settings'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <div className="min-h-screen bg-black">
      <ToastContainer/>
      <Navbar />
      <div className="flex gap-3">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/task" element={<Task />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App