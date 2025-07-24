import User from '../models/user.js';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userRegister = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    try {
        const hashedPassword = await bycrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isAdmin,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
    } catch (error) {
        res.status(500).json({
            message: 'Error logging in', error: error.message
        });
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
}

export { userRegister, userLogin, getUserById };