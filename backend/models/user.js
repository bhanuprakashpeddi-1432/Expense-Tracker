import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    month: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { id: false }
);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  expense: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
  income: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Income",
    },
  ],
  role: {
    type: String,
    enum: ["admin", "manager", "user"],
    default: "user",
  },
  budget: [budgetSchema],
});

const User = mongoose.model("User", userSchema);
export default User;
