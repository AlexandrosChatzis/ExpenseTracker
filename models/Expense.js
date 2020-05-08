const mongoose = require("mongoose");
const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();
const ExpenseSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  etiology: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  ammount: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    default: `${year}-${month}`
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Expense", ExpenseSchema);
