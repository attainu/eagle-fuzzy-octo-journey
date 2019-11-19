const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const PORT = 3000;
const router = require("./router.js");

// support parsing of application/json type post data
app.use(express.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const hbs = exphbs.create({
  extname: ".hbs",
  helpers: {
    ifCond: function(v1, v2, options) {
      if (v1 === v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  }
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.use("/", router);

app.listen(PORT, function(req, res) {
  console.log("Application is running on PORT: ", PORT);
});
