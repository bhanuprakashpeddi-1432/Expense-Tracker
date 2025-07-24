import { Router as ExpressRouter } from "express";
import User from '../models/user.js';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserById, userLogin, userRegister } from "../controllers/userController.js";
import auth from '../middleware/auth.js';


const Router = ExpressRouter();

Router.post('/register', userRegister);

Router.post('/login', userLogin);

Router.get('/:id', getUserById);

export default Router;