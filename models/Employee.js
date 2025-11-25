const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    basic: { type: Number, required: true },
    otHours: { type: Number, default: 0 },
    otRate: { type: Number, default: 0 },
    otAmount: Number,
    fullSalary: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);