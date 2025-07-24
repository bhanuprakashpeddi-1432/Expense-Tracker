import express from "express";
import { Router as ExpressRouter } from "express";

import { budgetPost, getBudget } from "../controllers/budgetController.js";

const Router = ExpressRouter();
Router.post('/', budgetPost);

Router.get('/:month', getBudget);

export default Router;