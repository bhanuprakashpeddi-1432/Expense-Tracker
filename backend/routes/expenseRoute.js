import { Router as ExpressRouter } from "express";
import expense from '../models/expense.js';
import { expenseDelete, expenseGet, expensePost, expensePut, getExpensesByUser } from "../controllers/expense_controller.js";
import auth from '../middleware/auth.js';
const Router = ExpressRouter();



Router.post('/', auth, expensePost);

Router.get('/user/:userId', auth, getExpensesByUser);

Router.get('/:id', auth, expenseGet);
Router.delete('/:id', auth, expenseDelete);
Router.put('/:id', auth, expensePut);

export default Router;