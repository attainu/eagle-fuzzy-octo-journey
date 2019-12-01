const User = require("./User.js");
dotenv.config();

const mongoose = require("mongoose");

function connect() {
  return mongoose.connect(
    "mongodb+srv://admin:admin@cluster0-cppyl.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  );
}

module.exports = {
  models: {
    User: User
  },
  connect: connect
};
