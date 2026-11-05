import React, { useContext, useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard'
import AddTask from '../components/AddTask'
import { ShopContext } from '../context/ShopContext'

const Task = () => {
    const [showAddTask, setShowAddTask] = useState(false)

    const { task, getTaskData } = useContext(ShopContext)
    useEffect(() => {
        getTaskData()
    }, [])
    return (
        <div className="w-full">
            {/* Task Heading, Search and Add Task */}
            <div className="mx-3 my-2 px-2 py-2 border border-purple-600 rounded-lg">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h4 className="text-xl font-semibold text-white px-2">
                        Tasks
                    </h4>
                    <div className="flex flex-wrap items-center gap-5">
                        <div className='hidden lg:flex gap-3'>
                            <input
                                className="w-full sm:w-[290px] rounded-lg border border-purple-400 bg-black px-3 py-2 text-sm text-white placeholder-gray-400"
                                type="search"
                                placeholder="Search Tasks"
                                aria-label="Search"
                            />
                            <button className="rounded-lg border border-purple-500 px-3 py-2 text-sm text-purple-400 hover:bg-purple-600 hover:text-white transition" type="button">
                                Search
                            </button>
                        </div>
                        <button
                            onClick={() => setShowAddTask(true)}
                            className="whitespace-nowrap rounded-lg border border-purple-500 px-3 py-2 text-sm text-purple-400 hover:bg-purple-600 hover:text-white transition"
                            type="button"
                        >
                            Add Task
                        </button>
                    </div>

                </div>
            </div>
            {/* Task Cards */}
            <div className="w-full px-4 py-3">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {task.map((item) => (
                        <div key={item._id}>
                            <TaskCard
                                title={item.title}
                                subTitle={item.subTitle}
                                description={item.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Add Task Modal */}
            {showAddTask && (
                <AddTask onClose={() => setShowAddTask(false)} />
            )}
        </div>
    )
}
export default Task
