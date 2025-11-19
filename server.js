const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

// Allow Json Body and CORS
app.use(cors());
app.use(express.json());

// Get Employee and -> Return all Employee
app.get("/employees", (req, res) => {
  console.log("GET /employees called");  
  fs.readFile("employees.json", "utf8", (err, data) => {
    if (err) {
      console.error("Read error:", err);
      return res.status(500).json({ error: "Error reading database" });
    }
    const employees = JSON.parse(data);
    res.json(employees);
  });
});

// POST Employee -> Add New Employee
app.post("/employees", (req, res) => {
  const newEmp = req.body; // { name, basic, otAmount, fullSalary }
  fs.readFile("employees.json", "utf-8", (err, data) => {
    let employees = [];

    if(!err && data) {
      employees = JSON.parse(data);
    }
    employees.push(newEmp);

    fs.writeFile("employees.json", JSON.stringify(employees, null, 2), (err2) => {
      if (err2) {
        console.error("Write error: ", err2);
        return res.status(500).json({ error: "Error Saving Employee"});
      }
      res.json({ message: "Employee Added! ", employees});
    })
  })
})

// Start Server
app.listen(5001, () => {
  console.log("🚀 Backend server started on http://localhost:5001");
});
