const express = require("express");
const cors = require("cors");
const { error, timeStamp } = require("console");
const mongoose = require("mongoose");


const app = express();

// MongoDB Connection Username - ems_user , Password - Isuru2025
const MONGO_URI =
"mongodb+srv://ems_user:Isuru2025@cluster0.bzpokzw.mongodb.net/?appName=Cluster0";

mongoose
.connect(MONGO_URI)
.then(() => console.log("MongoDB Connected!"))
.catch((err) => console.error("MongoDB Error!", err));


// Employees Schema
const employeeSchema = new mongoose.Schema(
  {
    name: String,
    basic: Number,
    otHours: Number,
    otRate: Number,
    otAmount: Number,
    fullSalary: Number,
  },
  {timeStamp: true}
);
const Employee = mongoose.model("Employee", employeeSchema);

// Allow Json Body and CORS
app.use(cors());
app.use(express.json());

// Get all employees (from MongoDB)
app.get("/employees", async (req, res) => {
  console.log("GET /employees called");
  try {
    const employees = await Employee.find().sort({ createdAt: 1 });
    res.json(employees);
  } catch (err) {
    console.error("GET Error:", err);
    res.status(500).json({ error: "Error reading database" });
  }
});

// Add new employee (MongoDB)
app.post("/employees", async (req, res) => {
  try {
    const emp = new Employee(req.body);
    const saved = await emp.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("POST Error:", err);
    res.status(500).json({ error: "Error saving employee" });
  }
});

// Update employee (MongoDB)
app.put("/employees/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const updated = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({error: "Employee not found!"});
    }
    res.json(updated);
  } catch (err) {
    console.error("PUT Error:", err);
    res.status(500).json({ error:"Error updating employee!"});
  }
});

// Delete employee (MongoDB)
app.delete("/employees/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const deleted = await Employee.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Employee not found!"});
    }
    res.json({ message: "Employee deleted!"});
  } catch (err) {
    console.error("DELETE Error:", err);
    res.status(500).json({ error: "Error deleting employee!"})
  }
});

// Start Server
app.listen(5001, () => {
  console.log("🚀 Backend server started on http://localhost:5001");
});
