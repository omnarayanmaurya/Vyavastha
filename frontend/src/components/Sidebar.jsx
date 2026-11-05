import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
Home,
ListTodo,
Inbox,
CalendarDays,
Activity,
Settings,
ChevronLeft,
ChevronRight
} from 'lucide-react'
const Sidebar = () => {
const [isOpen, setIsOpen] = useState(false)
const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Task', path: '/task', icon: ListTodo },
    { name: 'Inbox', path: '/inbox', icon: Inbox },
    { name: 'Calendar', path: '/calendar', icon: CalendarDays },
    { name: 'Activity', path: '/activity', icon: Activity },
    { name: 'Settings', path: '/settings', icon: Settings }
]
return (
    <aside className={`relative shrink-0 h-[calc(100vh-64px)] bg-black border-r border-purple-800 p-3 transition-all duration-300 ${isOpen ? 'w-[80px]' : 'w-[240px]'}`}>
        {/* Navigation */}
        <nav className="flex flex-col gap-3">

            {menuItems.map((item) => {

                const Icon = item.icon

                return (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end={item.path === '/'}
                        title={isOpen ? item.name : ''}
                        className={({ isActive }) =>
                            `flex items-center gap-4 rounded-lg px-4 py-3 transition-all duration-200
                            ${isActive
                                ? 'bg-purple-700 text-white shadow-md shadow-purple-900/40'
                                : 'text-gray-300 hover:bg-purple-950 hover:text-white'
                            }
                            ${isOpen ? 'justify-center px-2' : ''}`
                        }
                    >
                        <Icon size={22} strokeWidth={2} />

                        {!isOpen && (
                            <span>{item.name}</span>
                        )}

                    </NavLink>
                )
            })}

        </nav>

        {/* Toggle Button */}
        <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Expand sidebar' : 'Collapse sidebar'}
            className="absolute -right-4 top-6 z-50 flex h-9 w-9 items-center justify-center rounded-full border-2 border-purple-500 bg-black text-white shadow-lg hover:bg-purple-700 transition-all duration-200"
        >
            {isOpen
                ? <ChevronRight size={20} />
                : <ChevronLeft size={20} />
            }
        </button>

    </aside>
)


}

export default Sidebar
