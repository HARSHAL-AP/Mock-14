const mongoose = require("mongoose");
const { Usermodel } = require("../models/user.model");
const express = require("express");
const bcrypt = require("bcrypt");
const userroutes = express.Router();
var jwt = require("jsonwebtoken");
require("dotenv").config();

userroutes.post("/register", async (req, res) => {
  const { user_name, avtar, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, result) => {
      if (err) {
        res.send("bcrypt Error");
      } else {
        const user = new Usermodel({
          user_name,
          avtar,
          email,
          password: result,
        });
        await user.save();
        res.send("User Registration Succsessfull....");
      }
    });
  } catch (error) {
    console.log(error);
    res.send("Error While Registering user...");
  }
});

userroutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usermodel.find({ email });
    const hashpass = user[0].password;
    bcrypt.compare(password, hashpass, (err, result) => {
      if (result) {
        const token = jwt.sign({ userID: user[0]._id }, process.env.key);
        res.send({ token: token,user_name:user[0].user_name,id:user[0]._id });
      }
    });
  } catch (error) {
    console.log(error);
    res.send("Unable Login at this moment..");
  }
});

module.exports = {
  userroutes,
};
