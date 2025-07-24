import Income from '../models/income.js';
import { Router as ExpressRouter } from "express";
const Router = ExpressRouter();


const incomePost = async (req, res) => {
    const { amount, source, date, category } = req.body;
    try {
        const userId = req.user;
        const incomeBody = { amount, source, date, user: userId, category };
        const newIncome = new Income(incomeBody);
        await newIncome.save();
        // Populate category details after save
        await newIncome.populate('category', 'name');
        res.status(201).json({ message: 'Income added successfully', income: newIncome });
    } catch (error) {
        res.status(500).json({ message: 'Error adding income', error: error.message });
    }
}

const getIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await Income.findById(id).populate('category', 'name');
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching income', error: error.message });
    }
}

const deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await Income.findByIdAndDelete(id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting income', error: error.message });
    }
}
const updateIncome = async (req, res) => {
    const { id } = req.params;
    const { amount, source, date, category } = req.body;
    try {
        const updateFields = { amount, source, date };
        if (category) updateFields.category = category;
        let income = await Income.findByIdAndUpdate(id, updateFields, { new: true });
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        income = await income.populate('category', 'name');
        res.status(200).json(income);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating income', error: error.message });
    }
}
const getIncomeByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const incomes = await Income.find({ user: userId }).populate('category', 'name');
        if (!incomes || incomes.length === 0) {
            return res.status(404).json({ message: 'No income found for this user' });
        }
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching income', error: error.message });
    }
}

export { incomePost, getIncome, deleteIncome, updateIncome, getIncomeByUser };