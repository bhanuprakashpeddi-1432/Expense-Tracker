import { Router as ExpressRouter } from "express";
import income from '../models/income.js';
import { deleteIncome, getIncome, incomePost, updateIncome, getIncomeByUser } from "../controllers/income_controller.js";
const Router = ExpressRouter();
import auth from '../middleware/auth.js';

Router.post('/', auth, incomePost);
Router.get('/user/:userId', auth, getIncomeByUser);

// Get income by ID is not  necesarry I rthink, but keeping it for consistency
Router.get('/:id', auth, getIncome); 


Router.delete('/:id', auth, deleteIncome);
Router.put('/:id', auth, updateIncome);
export default Router;