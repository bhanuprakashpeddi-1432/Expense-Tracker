import User from '../models/user.js';


const budgetPost = (req, res) => {
    const { budget } = req.body;
    const userId = req.user.id || req.user._id;
    if (!budget || !Array.isArray(budget)) {
        return res.status(400).json({ message: 'Budget must be an array.' });
    }
    User.findByIdAndUpdate(userId, { budget }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'Budget updated successfully', user: updatedUser });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error updating budget' });
        });
}

const getBudget = async (req, res) => {
    const month = req.params.month;
    const userId = req.user.id || req.user._id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const budget = user.budget.find(b => b.month === month);
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found for this month' });
        }
        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching budget' });
    }
}

export { budgetPost, getBudget };