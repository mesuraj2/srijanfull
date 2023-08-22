const mongoose = require("mongoose");

const notificationModel = mongoose.Schema(
  {
    chatName: {
      type: String,
    },
    message: {
      type: String,
      default: "New Message", //make sure it is chatMsgNoti. or offerNoti.
    },
    seen: {
      type: Boolean,
      default: false,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    expireAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

notificationModel.index({ expireAt: 1 }, { expireAfterSeconds: 2 });
module.exports = mongoose.model("notifications", notificationModel);
