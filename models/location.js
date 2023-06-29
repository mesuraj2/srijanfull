const mongoose = require("mongoose");

const locationCordModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "offers",
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chats",
  },
  Location: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
});

locationCordModel.index({ Location: "2dsphere" });
module.exports = mongoose.model("locations", locationCordModel);
