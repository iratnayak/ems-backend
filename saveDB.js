const fs = require("fs");

function saveDatabase(data){
    fs.writeFileSync("employees.json", JSON.stringify(data, null, 2));
    console.log("\n Database Updated and save employee.json");
    
}

module.exports = saveDatabase;