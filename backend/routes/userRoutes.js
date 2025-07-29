import { Router as ExpressRouter } from "express";
import User from '../models/user.js';
import auth from '../middleware/auth.js';
import requireRole from '../middleware/role.js';

// Admin: Update a user's role
Router.put('/admin/role/:id', auth, requireRole('admin'), async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    if (!['admin', 'manager', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Role updated', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating role', error: error.message });
  }
});

// Admin: Delete a user
Router.delete('/admin/user/:id', auth, requireRole('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted', user });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});
// Example user-only route
Router.get('/user/dashboard', auth, requireRole('user'), (req, res) => {
  res.json({ message: 'Welcome, user! This is the user dashboard.' });
});

import { getUserById, userLogin, userRegister } from "../controllers/userController.js";
import requireRole from '../middleware/role.js';


const Router = ExpressRouter();

Router.post('/register', userRegister);
Router.post('/login', userLogin);
Router.get('/:id', auth, getUserById);

// Example admin-only route
Router.get('/admin/dashboard', auth, requireRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin! This is the admin dashboard.' });
});

// Example manager-only route
Router.get('/manager/dashboard', auth, requireRole('manager'), (req, res) => {
  res.json({ message: 'Welcome, manager! This is the manager dashboard.' });
});

export default Router;