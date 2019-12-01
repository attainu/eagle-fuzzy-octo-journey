const User = require("./User.js");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

function connect() {
  return mongoose.connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
}

module.exports = {
  models: {
    User: User
  },
  connect: connect
};
