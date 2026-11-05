import task from '../models/task.js'

// Create a new task
const createTask = async (req, res) => {
try {
const { title, subTitle, description } = req.body
    const newTask = await task.create({
        title,
        subTitle,
        description
    })

    res.status(201).json({
        message: 'Task created successfully!',
        task: newTask
    })

} catch (error) {
    res.status(400).json({
        message: error.message
    })
}
}

// Get all tasks
const getTask = async (req, res) => {
try {
const allTasks = await task.find().sort({ createdAt: -1 })


    res.status(200).json({
        task: allTasks
    })

} catch (error) {
    res.status(500).json({
        message: error.message
    })
}


}

export { createTask, getTask }
