import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['expense', 'income'],
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;