const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const PORT = 5051;

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const hbs = exphbs.create({
  extname: ".hbs"
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

app.get("/", function(request, response) {
  response.render("home", { title: "Flash Rides - Flash speed commuting service." });
});

app.get("/login", function(request, response) {
  response.render("login", { title: "Login" });
});

app.get("/signup", function(request, response) {
  response.render("signup", { title: "Sign Up" });
});

app.listen(PORT, function() {
  console.log("application listen at Port:", PORT);
});
