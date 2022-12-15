const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  postId:{
    type:String,

  },
  createdAt: {
    type: Date, default: Date.now
  },

});

module.exports = mongoose.model("Comment", commentSchema);