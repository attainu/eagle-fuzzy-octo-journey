//@divya you'll need this line to import your db config here and fetch users collection
const usersCollection = require("../config/dbConfig")
  .db()
  .collection("users");

//this constructor function will help you receive data from userController node in 'data' param and we will save it locally.
let User = function(data) {
  this.data = data;
  this.errors = [];
};

//My old cleanup code to get rid of bogus stuff
//you can use it inside individual user controller methods

User.prototype.cleanUp = function() {
  if (typeof this.data.username != "string") {
    this.data.username = "";
  }
  if (typeof this.data.email != "string") {
    this.data.email = "";
  }
  if (typeof this.data.password != "string") {
    this.data.password = "";
  }

  // get rid of any bogus properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password
  };
};

// My validation code if you need this too

User.prototype.validate = function() {
  return new Promise(async (resolve, reject) => {
    if (this.data.username == "") {
      this.errors.push("You must provide a username.");
    }
    if (
      this.data.username != "" &&
      !validator.isAlphanumeric(this.data.username)
    ) {
      this.errors.push("Username can only contain letters and numbers.");
    }
    if (!validator.isEmail(this.data.email)) {
      this.errors.push("You must provide a valid email address.");
    }
    if (this.data.password == "") {
      this.errors.push("You must provide a password.");
    }
    if (this.data.password.length > 0 && this.data.password.length < 8) {
      this.errors.push("Password must be at least 8 characters.");
    }
    if (this.data.password.length > 50) {
      this.errors.push("Password cannot exceed 50 characters.");
    }
    if (this.data.username.length > 0 && this.data.username.length < 3) {
      this.errors.push("Username must be at least 3 characters.");
    }
    if (this.data.username.length > 30) {
      this.errors.push("Username cannot exceed 30 characters.");
    }

    //only if username is valid then check to see if its unique in db.
    if (
      this.data.username.length > 2 &&
      this.data.username.length < 31 &&
      validator.isAlphanumeric(this.data.username)
    ) {
      let usernameExists = await usersCollection.findOne({
        username: this.data.username
      });
      if (usernameExists) {
        this.errors.push("That username is already taken");
      }
    }

    //only if email is valid then check to see if its unique in db.
    if (validator.isEmail(this.data.email)) {
      let emailExists = await usersCollection.findOne({
        email: this.data.email
      });
      if (emailExists) {
        this.errors.push("That Email is already taken");
      }
    }
    resolve();
  });
};

//
User.prototype.login = function() {
  //your controller's login method handler
};

User.prototype.register = function() {
  //your controller's register method handler
};

//default avatar code
User.prototype.getAvatar = function() {
  this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`;
};

module.exports = User;
