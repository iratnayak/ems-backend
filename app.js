const prompt = require("prompt-sync")();
const saveDB = require("./saveDB");
const loadDB = require("./loadDB");

let employees = loadDB();
let count = parseInt(prompt("How many employees will add? "));

for (let i=0; i<count; i++){
    console.log("\nEmployee Number: " + (i+1));
    let name = prompt("Enter EMP Name: ");
    let basic = parseFloat(prompt("Enter Basic Salary (Rs): "));
    let OTh = parseFloat(prompt("Enter OT Hours: "));
    let OTr = parseFloat(prompt("Enter OT Rate (Rs): "))

    let otAmount = OTh*OTr;
    let fullSalary = otAmount+basic;

    employees.push({name, basic, otAmount, fullSalary});
}

saveDB(employees);

console.log("\n-------------------- Employees Database --------------------");
employees.forEach(e => 
    console.log(`${e.name} | Basic ${e.basic} | OT ${e.otAmount} | Total Salary ${e.fullSalary}`)  
);

console.log("---------------------------------------------------------------");

