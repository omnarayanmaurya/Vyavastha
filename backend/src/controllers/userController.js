import user from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register user
export const registerUser = async (req, res) => {
try {
const { username, email, password } = req.body
    const existingUser = await user.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        return res.status(400).json({
            message: 'Username or email already exists'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await user.create({
        username,
        email,
        password: hashedPassword
    })

    const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    res.status(201).json({
        message: 'Registration Successful',
        token
    })

} catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: error.message })
}
}

// Login user
export const loginUser = async (req, res) => {
try {
const { username, password } = req.body
    const existingUser = await user.findOne({ username })

    if (!existingUser) {
        return res.status(400).json({
            message: 'Invalid Credentials'
        })
    }

    const isMatch = await bcrypt.compare(
        password,
        existingUser.password
    )

    if (!isMatch) {
        return res.status(400).json({
            message: 'Invalid Credentials'
        })
    }

    const token = jwt.sign(
        { id: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    res.status(200).json({
        message: 'Login Successful',
        token
    })
} catch (error) {
    res.status(500).json({ message: error.message })
}
}
