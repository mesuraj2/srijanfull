const mongoose = require("mongoose");

const notificationModel = mongoose.Schema(
  {
    messagefor: {
      type: String, //make sure it is chatMsgNoti. or offerNoti.
    },
    seen: {
      type: Boolean,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notification", notificationModel);
