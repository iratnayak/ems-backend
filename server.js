const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

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

app.listen(5001, () => {
  console.log("🚀 Backend server started on http://localhost:5001");
});
