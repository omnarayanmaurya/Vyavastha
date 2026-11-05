import express from 'express'
import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    addMember,
    removeMember
} from '../controllers/projectController.js'
import authUser from '../middleware/auth.js'
const projectRouter=express.Router()

projectRouter.post('/create',authUser,createProject)
projectRouter.get('/all',authUser,getProjects)
// : represents dynamic
projectRouter.get('/:projectId',authUser,getProjectById)
projectRouter.put('/:projectId',authUser,updateProject)
projectRouter.delete('/:projectId',authUser,deleteProject)
projectRouter.post('/:projectId/add-member',authUser,addMember)
projectRouter.delete('/:projectId/remove-member/:memberId',authUser,removeMember)
export default projectRouter