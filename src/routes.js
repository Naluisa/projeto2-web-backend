const multer = require("multer");
const path = require("path");
const { Router } = require("express");
const uploadConfig = require("./config/upload");

const UserController = require("./controllers/UserController");
const { verifyAdmin, verifyCommon } = require("./middleware/auth");
const User = require("./models/User");
const ProductController = require("./controllers/ProductController");

const routs = Router();
const upload = multer(uploadConfig);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname));
    }
});


routs.post("/cadastro", UserController.store);
routs.post("/login", UserController.login);
routs.get("/verifyToken", UserController.verify);
routs.get("/product", ProductController.index);
routs.post("/product", upload.single("photo"),ProductController.store );
routs.get("/products", ProductController.show);
routs.get("/search", UserController.search);
//routs.post("/commonRoute", verifyCommon, UserController.asj);
//routs.post("/admin", verifyAdmin, UserController.asisaji);
//routs.get("/protected", verifyToken, UserController.protectedRoute);

module.exports = routs;
