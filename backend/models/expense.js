import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        default: "Other expenses"
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    category: {
        type: String,
        ref: 'Category',
        default: null,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const expense = mongoose.model('Expense', expenseSchema);

export default expense;