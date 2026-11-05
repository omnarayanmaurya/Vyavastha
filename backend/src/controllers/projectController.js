import project from '../models/project.js'
import user from '../models/user.js'


// 1. CREATE PROJECT
export const createProject = async (req, res) => {
    try {
        const { name, description } = req.body

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: 'Project name is required'
            })
        }

        const newProject = await project.create({
            name: name.trim(),
            description,
            creator: req.userId,
            members: [req.userId]
        })

        return res.status(201).json({
            message: 'Project created successfully',
            project: newProject
        })

    } catch (error) {
        console.error('Create project error:', error)
        return res.status(500).json({
            message: error.message
        })
    }
}


// 2. GET ALL PROJECTS OF LOGGED-IN USER
export const getProjects = async (req, res) => {
    try {
        const projects = await project.find({
            members: req.userId
        })
            .populate('creator', 'username email')
            .populate('members', 'username email')

        return res.status(200).json({
            projects
        })

    } catch (error) {
        console.error('Get projects error:', error)
        return res.status(500).json({
            message: error.message
        })
    }
}


// 3. GET SINGLE PROJECT
export const getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params

        const existingProject = await project.findOne({
            _id: projectId,
            members: req.userId
        })
            .populate('creator', 'username email')
            .populate('members', 'username email')

        if (!existingProject) {
            return res.status(404).json({
                message: 'Project not found or access denied'
            })
        }

        return res.status(200).json({
            project: existingProject
        })

    } catch (error) {
        console.error('Get project error:', error)
        return res.status(500).json({
            message: error.message
        })
    }
}


// 4. UPDATE PROJECT
export const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params
        const { name, description } = req.body

        const existingProject = await project.findById(projectId)

        if (!existingProject) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        // Only creator can update the project
        if (existingProject.creator.toString() !== req.userId) {
            return res.status(403).json({
                message: 'Only the project creator can update this project'
            })
        }

        if (name !== undefined) {
            if (typeof name !== 'string' || !name.trim()) {
                return res.status(400).json({
                    message: 'Project name cannot be empty'
                })
            }

            existingProject.name = name.trim()
        }

        if (description !== undefined) {
            existingProject.description = description
        }

        await existingProject.save()

        return res.status(200).json({
            message: 'Project updated successfully',
            project: existingProject
        })

    } catch (error) {
        console.error('Update project error:', error)
        return res.status(500).json({
            message: error.message
        })
    }
}


// 5. DELETE PROJECT
export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params

        const existingProject = await project.findById(projectId)

        if (!existingProject) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        // Only creator can delete the project
        if (existingProject.creator.toString() !== req.userId) {
            return res.status(403).json({
                message: 'Only the project creator can delete this project'
            })
        }

        await project.findByIdAndDelete(projectId)

        return res.status(200).json({
            message: 'Project deleted successfully'
        })

    } catch (error) {
        console.error('Delete project error:', error)
        return res.status(500).json({
            message: error.message
        })
    }
}


// 6. ADD MEMBER
export const addMember = async (req, res) => {
    try {
        const { projectId } = req.params
        const { identifier } = req.body

        if (!identifier || !identifier.trim()) {
            return res.status(400).json({
                message: 'Enter the username or email of the user'
            })
        }

        const existingProject = await project.findById(projectId)

        if (!existingProject) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        // Only creator can add members
        if (existingProject.creator.toString() !== req.userId) {
            return res.status(403).json({
                message: 'Only the project creator can add members'
            })
        }

        // Find user using either username or email
        const member = await user.findOne({
            $or: [
                { username: identifier.trim() },
                { email: identifier.trim().toLowerCase() }
            ]
        })

        if (!member) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        // Prevent duplicate members
        if (existingProject.members.some(
            id => id.toString() === member._id.toString()
        )) {
            return res.status(400).json({
                message: 'User is already a project member'
            })
        }

        existingProject.members.push(member._id)

        await existingProject.save()

        return res.status(200).json({
            message: 'Member added successfully',
            project: existingProject
        })

    } catch (error) {
        console.error('Add member error:', error)
        return res.status(500).json({
            message: error.message
        })
    }
}


// 7. REMOVE MEMBER
export const removeMember = async (req, res) => {
    try {
        const { projectId, memberId } = req.params

        const existingProject = await project.findById(projectId)

        if (!existingProject) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        // Only creator can remove members
        if (existingProject.creator.toString() !== req.userId) {
            return res.status(403).json({
                message: 'Only the project creator can remove members'
            })
        }

        // Creator cannot remove themselves
        if (existingProject.creator.toString() === memberId) {
            return res.status(400).json({
                message: 'Project creator cannot be removed'
            })
        }

        const isMember = existingProject.members.some(
            id => id.toString() === memberId
        )

        if (!isMember) {
            return res.status(404).json({
                message: 'User is not a member of this project'
            })
        }

        existingProject.members = existingProject.members.filter(
            id => id.toString() !== memberId
        )

        await existingProject.save()

        return res.status(200).json({
            message: 'Member removed successfully',
            project: existingProject
        })

    } catch (error) {
        console.error('Remove member error:', error)
        return res.status(500).json({
            message: error.message
        })
    }
}
