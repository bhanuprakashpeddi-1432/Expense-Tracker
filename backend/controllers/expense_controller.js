
import expense from '../models/expense.js';
import '../models/category.js';

function validateExpense(body) {
    if (!body.title || typeof body.title !== 'string' || body.title.trim().length < 2) return 'Title is required and must be at least 2 characters.';
    if (!body.amount || typeof body.amount !== 'number' || body.amount <= 0) return 'Amount must be a positive number.';
    if (!body.category) return 'Category is required.';
    if (!body.user) return 'User is required.';
    return null;
}

const expensePost = async (req, res) => {
    const expenseBody = { ...req.body, user: req.user.id || req.user._id };
    const validationError = validateExpense(expenseBody);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }
    try {
        const newExpense = new expense(expenseBody);
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ message: 'Error saving expense' });
    }
};

const expenseGet = async (req, res) => {
    const { id } = req.params;
    try {
        const expenseData = await expense.findById(id).populate('category', 'name');
        if (!expenseData) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        if (expenseData.user.toString() !== (req.user.id || req.user._id)) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        res.status(200).json(expenseData);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expense' });
    }
};

const expenseDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const exp = await expense.findById(id);
        if (!exp) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        if (exp.user.toString() !== (req.user.id || req.user._id)) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        await expense.findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting expense' });
    }
};

const getExpensesByUser = async (req, res) => {
    const userId = req.user.id || req.user._id;
    try {
        const expenses = await expense.find({ user: userId }).populate('category', 'name');
        if (!expenses || expenses.length === 0) {
            return res.status(404).json({ message: 'No expenses found for this user' });
        }
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses' });
    }
};

const expensePut = async (req, res) => {
    const { id } = req.params;
    try {
        const exp = await expense.findById(id);
        if (!exp) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        if (exp.user.toString() !== (req.user.id || req.user._id)) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        const validationError = validateExpense({ ...req.body, user: exp.user });
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        const updatedExpense = await expense.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedExpense);
    } catch (err) {
        res.status(500).json({ message: 'Error updating expense' });
    }
};

export {
    expensePost,
    expenseGet,
    expenseDelete,
    expensePut,
    getExpensesByUser
};
