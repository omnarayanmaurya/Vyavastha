import mongoose from 'mongoose'

const tasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subTitle: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

const task = mongoose.models.task || mongoose.model('task', tasksSchema)

export default task