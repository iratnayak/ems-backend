const Employee = require("../models/Employee");


exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    
    const name = req.body.name;
    const basic = parseFloat(req.body.basic);     
    const otHours = parseFloat(req.body.otHours); 
    const otRate = parseFloat(req.body.otRate);   

  
    const otAmount = otHours * otRate;
    const fullSalary = basic + otAmount; 

    const newEmployee = new Employee({
      name, basic, otHours, otRate, otAmount, fullSalary,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json({ error: "Failed to create employee" });
  }
};


exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (err) {
    res.status(404).json({ error: "Employee not found" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    
   
    const name = req.body.name;
    const basic = parseFloat(req.body.basic);
    const otHours = parseFloat(req.body.otHours);
    const otRate = parseFloat(req.body.otRate);
    
    const otAmount = otHours * otRate;
    const fullSalary = basic + otAmount;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, basic, otHours, otRate, otAmount, fullSalary },
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: "Error updating" });
  }
};


exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.json({ message: "Employee Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting" });
  }
};