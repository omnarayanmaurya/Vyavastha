import {useState} from 'react'

const TaskCard = ({ title, subTitle, description }) => {
  const [status, setStatus] = useState('Pending')
  
  return (
  <div className="rounded-lg border border-purple-200 bg-purple-300 p-4 shadow-sm transition duration-200 hover:shadow-md">
    {/* Title */}
    <h5 className="mb-3 text-xl md:text-2xl font-bold text-purple-950">
      {title}
    </h5>
    {/* Task Details */}
    <div className="mb-4">
      <h6 className="mb-2 text-sm font-medium text-purple-700">
        {subTitle}
      </h6>
      <p className="text-sm text-gray-700">
        {description}
      </p>
    </div>
    {/* Status Selector */}
    <div className="flex items-center justify-between border-t border-purple-200 pt-3">
      <div className='flex gap-2'>
        <label className="mb-2 block text-sm font-medium text-purple-900">
        Status:
      </label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className=" rounded-lg border border-purple-300 px-1 py-1 text-sm text-purple-950"
      >
        <option value="Pending">Pending</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Under Review">Under Review</option>
        <option value="Completed">Completed</option>
      </select>
      </div>
      {/* Actions */}
      <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100">
        Delete
      </button>
    </div>
  </div>
  )
}

export default TaskCard
