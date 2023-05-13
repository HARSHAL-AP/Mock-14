const mongoose = require("mongoose");
const { Blogmodel } = require("../models/blog.model");
const express = require("express");
const blogroute = express.Router();
require("dotenv").config();

blogroute.get("/", async (req, res) => {
 const page=req.query.page||1
 const limit=req.query.limit||5




  try {
    let data = await Blogmodel.find().skip((page-1)*limit).limit(limit);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send("Error While fetching Data....");
  }
});

blogroute.post("/", async (req, res) => {
  let { username, title, content, category, date, likes, comments } = req.body;
  try {
    let data = new Blogmodel({
      username,
      title,
      content,
      category,
      date,
      likes,
      comments,
    });
    await data.save();

    res.send("New Blog Posted Sucsessfully....");
  } catch (error) {
    console.log(error);
    res.send("Error While fetching Data....");
  }
});

module.exports = {
  blogroute,
};
