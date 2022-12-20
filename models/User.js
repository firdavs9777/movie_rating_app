const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const bcrypt = require("bcrypt");

// const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema({
  name: String,
   email: {
        type: String
    },
    password: {
        type: String,
        bcrypt: true
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

module.exports.createUser = (newUser, callback) => {
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(newUser.password, salt, (error, hash) => {
      const newUserResource = newUser;
      newUserResource.password = hash;
      console.log("Hashed password");
      console.log(newUserResource.password);
      newUserResource.save(callback);
    });
  });
};
module.exports.getUserByEmail = (email, callback) => {
  const query = { email };
  User.findOne(query, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  console.log('hello');
  console.log(hash);
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    console.log(isMatch);
    if (err) throw err;
   callback(null, isMatch);
  });
};
