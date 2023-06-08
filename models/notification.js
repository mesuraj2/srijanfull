const mongoose = require("mongoose");

const notificationModel = mongoose.Schema(
  {
    message: {
      type: String, //make sure it is chatMsgNoti. or offerNoti.
    },
    seen: {
      type: Boolean,
      default:false
    },
    chatId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notification", notificationModel);
