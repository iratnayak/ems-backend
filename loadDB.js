const fs = require("fs");

function loadDatabase() {
    if (fs.existsSync("employees.json")){
        return JSON.parse(fs.readFileSync("employees.json"));
    } else {
        return[];
    }
}

module.exports = loadDatabase;