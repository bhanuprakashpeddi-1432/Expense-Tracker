export const getDashboardTransactions = async (req, res) => {
    try {
        const userId = req.user._id;

        // Get all income and expense transactions for the user
        const incomeTransactions = await Income.find({ user: userId }).populate('category').sort({ date: -1 });
        const expenseTransactions = await Expense.find({ user: userId }).populate('category').sort({ date: -1 });

        // Combine both income and expense transactions into a single array
        const allTransactions = [
            ...incomeTransactions.map(transaction => ({
                ...transaction.toObject(),
                type: 'income',
            })),
            ...expenseTransactions.map(transaction => ({
                ...transaction.toObject(),
                type: 'expense',
            }))
        ];

        // Sort all transactions by date (most recent first)
        const sortedTransactions = allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json(sortedTransactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Error fetching transactions' });
    }
};
import Income from '../models/income.js';
import Expense from '../models/expense.js';

export const getDashboardSummary = async (req, res) => {
    try {
        const userId = req.user._id;

        const incomeResult = await Income.aggregate([
            { $match: { user: userId } },
            { $group: { _id: null, totalIncome: { $sum: '$amount' } } }
        ]);

        const expenseResult = await Expense.aggregate([
            { $match: { user: userId } },
            { $group: { _id: null, totalExpense: { $sum: '$amount' } } }
        ]);

        const totalIncome = incomeResult[0]?.totalIncome || 0;
        const totalExpense = expenseResult[0]?.totalExpense || 0;
        const balance = totalIncome - totalExpense;

        res.status(200).json({ totalIncome, totalExpense, balance });
    } catch (error) {
        console.error('Dashboard summary error:', error);
        res.status(500).json({ message: 'Failed to fetch dashboard summary' });
    }
};