// Import Express
let express = require("express");
// Import user controller
let User = require("../controllers/user");

// Create the API
let api = express.Router();

api.post("/user/registerUser", User.registerUser);
api.post("/login", User.login);
api.get("/user", User.listUser);
api.put("/user/editUser/:id", User.editUser);
api.get("/user/:id", User.getUser);
api.delete("/user/deleteUser/:id", User.deleteUser);

// Export the module
module.exports = api;