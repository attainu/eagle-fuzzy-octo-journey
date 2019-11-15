const express = require("express");
const router = express.Router();
//importing usercontroller to use it with express routers
const userController = require("./controllers/userController");

router.get("/", userController.home);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
module.exports = router;
