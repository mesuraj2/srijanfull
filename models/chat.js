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
    isCabChat: { type: Boolean, default: false },
    place: {
      from: {type: String, required: true},
      to: {type: String, required: true}
    },
    admin:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
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
    offerid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "offer",
    },
    Location: {
      type: {
        type: String
      },
      coordinates: [Number]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chat", Chatmodel);
