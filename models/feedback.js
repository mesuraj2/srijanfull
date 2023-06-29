const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  feedback: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
},{timestamps: true});

module.exports = mongoose.model("feedback", feedbackSchema);
