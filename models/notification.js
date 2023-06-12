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
      ref: "chat",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

notificationModel.index({ createdAt: 1 }, { expireAfterSeconds: 600 });
module.exports = mongoose.model("notification", notificationModel);
