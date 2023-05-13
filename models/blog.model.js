const mongoose = require("mongoose");

const blogSchima = mongoose.Schema({
  username:String,
  title:String,
  content:String,
  category:String,
  date:String,
  likes:Number,
  comments: [
    { username:String, content: String }
  ],
});

const Blogmodel = mongoose.model("blog", blogSchima);

module.exports = {
  Blogmodel,
};
