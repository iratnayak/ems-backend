const fs = require("fs");

function loadUsers(){
    const data = fs.readFileSync("user.json");
    return JSON.parse(data);
}

function login(username, password){
    const users = loadUsers();
    const user = users.find (
        (u) => u.username === username && u.password === password
    );
    return user || null;
}
 module.exports = login;
