const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const exisitingUser = await User.findOne({ email });
        if (exisitingUser) {
            return res.status(409).json({ message: "User already exist" })
        }
        const user = await User.create({
            name,
            email,
            password
        });
        return res.status(201).json({
            message: 'User registered successfully',
            userId: user._id
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'email and password required' })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials' })
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' })
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getUserProfile = async (req, res) => {
    try {
        res.status(200).json({
            message: 'User profile fetched successfully',
            success: true,
            user: req.user
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };