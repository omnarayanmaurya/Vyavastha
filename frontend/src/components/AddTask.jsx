import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const AddTask = ({ onClose }) => {


const { createTask } = useContext(ShopContext)

const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    description: ''
})

const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
        ...prev,
        [name]: value
    }))
}

const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        await createTask(formData)
        onClose()
    } catch (error) {
        console.log('Failed to create task', error)
    }
}

return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

        {/* Modal Card */}
        <div className="bg-black border border-purple-600 w-full sm:w-11/12 md:w-3/4 lg:w-1/2 rounded-lg shadow-xl p-6">

            {/* Heading and Close Button */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-5">

                <h2 className="text-2xl font-semibold text-white">
                    Add Task
                </h2>

                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-500 hover:text-red-600 text-2xl font-bold"
                >
                    &times;
                </button>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Title */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white">
                        Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        required
                        className="bg-black text-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Subtitle */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white">
                        Subtitle
                    </label>

                    <input
                        type="text"
                        name="subTitle"
                        value={formData.subTitle}
                        onChange={handleChange}
                        placeholder="Enter task subtitle"
                        className="bg-black text-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Enter task description"
                        className="bg-black text-white border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition"
                >
                    Add Task
                </button>

            </form>

        </div>
    </div>
)


}

export default AddTask
