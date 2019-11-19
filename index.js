const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const PORT = 3000;

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const hbs = exphbs.create({
  extname: ".hbs",
  helpers: {
    ifCond: function (v1, v2, options) {
      if (v1 === v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  }
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

app.get("/", function (request, response) {
  response.render("home", {
    title: "Flash Rides - Flash speed commuting service.",
    layout: "guest.hbs"
  });
});

app.get("/login", function (request, response) {
  response.render("login", { title: "Login", layout: "guest.hbs" });
});

app.get("/signup", function (request, response) {
  response.render("signup", { title: "Sign Up", layout: "guest.hbs" });
});

app.get("/dashboard", function (request, response) {
  response.render("dashboard", {
    title: "User Dashboard",
    page_name: "dashboard",
    layout: "user.hbs"
  });
});
app.get("/dashboard/rides", function (request, response) {
  response.render("rides", {
    title: "User Rides",
    layout: "user.hbs",
    page_name: "rides"
  });
});
app.get("/dashboard/billing", function (request, response) {
  response.render("billing", {
    title: "User Billing",
    layout: "user.hbs",
    page_name: "billing"
  });
});
app.get("/dashboard/profile", function (request, response) {
  response.render("profile", {
    title: "User Support",
    layout: "user.hbs",
    page_name: "profile"
  });
});
app.get("/dashboard/support", function (request, response) {
  response.render("support", {
    title: "User Support",
    layout: "user.hbs",
    page_name: "support"
  });
});

//to send email services
const sendEmail = require('./controllers/emailservices.js');

app.post('/sendmail', sendEmail.contactUsEmail);
app.post('/subscribemail',sendEmail.subscribeEmail);
app.post('/supportemail',sendEmail.supportEmail);

//end email service

app.listen(PORT, function () {
  console.log("application listen at Port:", PORT);
});
