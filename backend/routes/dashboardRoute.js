import express from 'express';
import { getDashboardSummary, getDashboardTransactions } from '../controllers/dashboardController.js';
import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/summary', auth, getDashboardSummary);
router.get('/transactions', auth, getDashboardTransactions);

export default router;
