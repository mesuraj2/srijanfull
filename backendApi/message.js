const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");
const User = require("../models/users");
const fetchuser = require("./fetchuser");
const Message = require("../models/Message");

router.post("/", fetchuser, async (req, res) => {
  const { content, chatId } = req.body;
  // //console.log(req.user.id)
  const id = req.user.id;
  // //console.log
  var newMessage = {
    sender: id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name email pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    // //console.log(message)
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.send(error);
  }
});

router.get("/allMessage/:chatId", fetchuser, async (req, res) => {
  // //console.log(req.query.page);
  const message = await Message.find({ chat: req.params.chatId })
    .sort({ createdAt: -1 })
    .skip((req.query.page - 1) * 5)
    .limit(5)
    .populate("sender", "name pic email")
    .populate("chat");
  res.json(message);
});

module.exports = router;
