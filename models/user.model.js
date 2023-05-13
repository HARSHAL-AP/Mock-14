const mongoose = require("mongoose");

const userSchima = mongoose.Schema({
  user_name: String,
  avtar: String,
  email: String,
  password: String,
});

const Usermodel = mongoose.model("user", userSchima);

module.exports = {
  Usermodel,
};
