const mongoose = require("mongoose");

const locationCordModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "offer",
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chat",
  },
  Location: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
});

locationCordModel.index({ Location: "2dsphere" });
module.exports = mongoose.model("location", locationCordModel);
