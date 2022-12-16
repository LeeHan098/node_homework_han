const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  postId: {
    type: String,

  },
  createdAt: {
    type: Date, default: Date.now
  },
  postid: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }]
});

module.exports = mongoose.model("Comments", commentSchema);