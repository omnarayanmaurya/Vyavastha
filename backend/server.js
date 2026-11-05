import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import dns from 'dns'
import connectDB from './src/config/db.js'
import taskRouter from './src/routes/taskRoutes.js'
import userRouter from './src/routes/userRoutes.js'

dns.setServers(['8.8.8.8', '1.1.1.1'])

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Home route
app.get('/', (req, res) => {
res.send('Welcome to Vyavastha Backend!')
})

// Task routes
app.use('/api/task', taskRouter)
//Auth routes
app.use('/api/user',userRouter)
// Start server after connecting to MongoDB
const PORT = process.env.PORT || 5000

const startServer = async () => {
await connectDB()


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


}

startServer()
