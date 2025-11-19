const prompt = require("prompt-sync")();
const fs = require("fs");
const login = require("./auth");
const { log } = require("console");

//Employee DB load

function loadEmployees(){
    if(fs.existsSync("employees.json")){
        return JSON.parse(fs.readFileSync("employees.json"))
    } else{
        return [];
    }
}

//Employee DB save 

function saveEmployees(data){
    fs.writeFileSync("employees.json", JSON.stringify(data, null, 2));
    console.log("\nDatabase Updated and saved employees.json");
    
}

// ==================== Login Part ==================

console.log("--------------- Employee Management System ------------------\n");

const username = prompt("Username: ");
const password = prompt("Password: ");

const user = login(username, password);

if(!user){
    console.log("\nInvalide username or password login failed!");
    process.exit();
}
console.log(`\nLogin Successfully! ${user.username} (Role: ${user.role})\n`);

// ====================== Main Logic ==================

let employees = loadEmployees();

// If admin can add employees

if(user.role === "admin"){
    const count = parseInt(prompt("How many employees will add? "));

    for(let i=0; i<count; i++){
        console.log(`\nEmployee Number: ${i+1}`);
        
        let name = prompt("Enter Employee Name: ");
        let basic = parseFloat(prompt("Enter Basic (Rs): "));
        let OTh = parseFloat(prompt("Enter OT Hours: "));
        let OTr = parseFloat(prompt("Enter Current OT Rate (Rs): "))

        let totalOT = OTh*OTr;
        let totalSalary = totalOT+basic;

        employees.push({name, basic, totalOT, totalSalary});
    }

    saveEmployees(employees);

} else{
    console.log("You have view option only, can not add new employees!");
    
}

// Common part (Admin + Staff) View Report

console.log("------------------------------ Employee Database ----------------------\n");
employees.forEach((e)=> {
    console.log(`
        ${e.name} | Basic ${e.basic} | OT ${e.totalOT} | Full Salary ${e.totalSalary}
        `);
});
console.log("------------------------------ Thankyou! --------------------------------\n");







