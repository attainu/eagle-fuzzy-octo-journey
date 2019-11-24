const express = require("express");
const router = express.Router();

//importing controllers to use it with express routers

const controllers = require("./controllers/index.js");

router.get("/", function(request, response) {
  response.render("home", {
    title: "Flash Rides - Flash speed commuting service.",
    layout: "guest.hbs"
  });
});

router.get("/login", function(request, response) {
  response.render("login", { title: "Login", layout: "guest.hbs" });
});

router.get("/signup", function(request, response) {
  response.render("signup", { title: "Sign Up", layout: "guest.hbs" });
});

router.get("/dashboard", function(request, response) {
  response.render("dashboard", {
    title: "User Dashboard",
    page_name: "dashboard",
    layout: "user.hbs"
  });
});
router.get("/dashboard/rides", function(request, response) {
  response.render("rides", {
    title: "User Rides",
    layout: "user.hbs",
    page_name: "rides"
  });
});
router.get("/dashboard/billing", function(request, response) {
  response.render("billing", {
    title: "User Billing",
    layout: "user.hbs",
    page_name: "billing"
  });
});

router.get("/dashboard/support", function(request, response) {
  response.render("support", {
    title: "User Support",
    layout: "user.hbs",
    page_name: "support"
  });
});

//router.post('/signup', controllers.UserController.register);

router.post("/login", controllers.UserController.login);

//router.post("/logout", userController.logout);

module.exports = router;
