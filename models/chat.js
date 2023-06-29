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
      from: {type: String},
      to: {type: String}
    },
    admin:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
    offerid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "offers",
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

module.exports = mongoose.model("chats", Chatmodel);
