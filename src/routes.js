const { Router } = require("express");
const UserController = require("./controllers/UserController");
const { verifyAdmin, verifyCommon } = require("./middleware/auth");
const routs = Router();

routs.post("/cadastro", UserController.store);
routs.post("/login", UserController.login);
//routs.post("/commonRoute", verifyCommon, UserController.asj);
//routs.post("/admin", verifyAdmin, UserController.asisaji);
//routs.get("/protected", verifyToken, UserController.protectedRoute);

module.exports = routs;
