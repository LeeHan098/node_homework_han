const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    unique: true
  }
  ,
  title: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  content: {
    type: String
  },
  createdAt: {
    type: Date, default: Date.now
  },

});

module.exports = mongoose.model("Posts", postsSchema);