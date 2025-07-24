import User from '../models/user.js';


const budgetPost = (req, res) => {
    const { budget } = req.body;
    const userId = req.user;
    User.findByIdAndUpdate(userId, { budget }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'Budget updated successfully', user: updatedUser });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error updating budget' });
        });
}

const getBudget = async (req, res) => {
    const month = req.params.month;
    const userId = req.user;
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
        console.error(error);
        res.status(500).json({ message: 'Error fetching budget' });
    }
}

export { budgetPost, getBudget };