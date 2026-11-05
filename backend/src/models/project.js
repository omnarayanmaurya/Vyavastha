import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
}, { timestamps: true })

const project = mongoose.models.project || mongoose.model('project', projectSchema)
export default project
