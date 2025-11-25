const express = require("express");
const router = express.Router();
const { 
    getEmployees, 
    createEmployee, 
    getEmployee, 
    updateEmployee, 
    deleteEmployee 
} = require("../controllers/employeeController");


router.get("/", getEmployees); 
router.post("/", createEmployee);
router.get("/:id", getEmployee); 
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;