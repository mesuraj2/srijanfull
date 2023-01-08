const mongoose = require("mongoose");

const Chatmodel = mongoose.Schema(
  {
    chatName: {
      type: String,
      required: true,
      trim: true,
    },
    isGroupChat: { type: Boolean, default: false },
    isOfferChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    Location: {
      type: {
        type: String,
      },
      coordinates: [Number],
    },
    offerid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "offer",
    }
  },
  {
    timestamps: true,
  }
);

Chatmodel.index({ Location: "2dsphere" });
module.exports = mongoose.model("chat", Chatmodel);
