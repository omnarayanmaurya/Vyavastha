import express from 'express'
import { createTask,getTask } from '../controllers/taskController.js'

const taskRouter =express.Router()

//create a new task
taskRouter.post('/create',createTask)
//get all task
taskRouter.get('/get',getTask)
export default taskRouter