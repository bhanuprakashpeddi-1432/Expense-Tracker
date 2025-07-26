
import Income from '../models/income.js';

function validateIncome(body) {
    if (!body.source || typeof body.source !== 'string' || body.source.trim().length < 2) return 'Source is required and must be at least 2 characters.';
    if (!body.amount || typeof body.amount !== 'number' || body.amount <= 0) return 'Amount must be a positive number.';
    if (!body.category) return 'Category is required.';
    if (!body.user) return 'User is required.';
    return null;
}

const incomePost = async (req, res) => {
    const { amount, source, date, category } = req.body;
    const userId = req.user.id || req.user._id;
    const incomeBody = { amount, source, date, user: userId, category };
    const validationError = validateIncome(incomeBody);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }
    try {
        const newIncome = new Income(incomeBody);
        await newIncome.save();
        await newIncome.populate('category', 'name');
        res.status(201).json({ message: 'Income added successfully', income: newIncome });
    } catch (error) {
        res.status(500).json({ message: 'Error adding income' });
    }
};

const getIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await Income.findById(id).populate('category', 'name');
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        if (income.user.toString() !== (req.user.id || req.user._id)) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching income' });
    }
};

const deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const inc = await Income.findById(id);
        if (!inc) {
            return res.status(404).json({ message: 'Income not found' });
        }
        if (inc.user.toString() !== (req.user.id || req.user._id)) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        await Income.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting income' });
    }
};

const updateIncome = async (req, res) => {
    const { id } = req.params;
    const { amount, source, date, category } = req.body;
    try {
        const inc = await Income.findById(id);
        if (!inc) {
            return res.status(404).json({ message: 'Income not found' });
        }
        if (inc.user.toString() !== (req.user.id || req.user._id)) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        const updateFields = { amount, source, date };
        if (category) updateFields.category = category;
        const validationError = validateIncome({ ...updateFields, user: inc.user, category: updateFields.category || inc.category });
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        let income = await Income.findByIdAndUpdate(id, updateFields, { new: true });
        income = await income.populate('category', 'name');
        res.status(200).json(income);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating income' });
    }
};

const getIncomeByUser = async (req, res) => {
    const userId = req.user.id || req.user._id;
    try {
        const incomes = await Income.find({ user: userId }).populate('category', 'name');
        if (!incomes || incomes.length === 0) {
            return res.status(404).json({ message: 'No income found for this user' });
        }
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching income' });
    }
};

export { incomePost, getIncome, deleteIncome, updateIncome, getIncomeByUser };