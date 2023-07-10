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
    await Chat.updateOne(
      { _id: req.body.chatId, "lastSeen.userId": req.user.id },
      { $set: { "lastSeen.$.lastMsgId": message } }
    );

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.send(error);
  }
});

router.post("/updtelstMsgSn", fetchuser, async (req, res) => {
  try {
    // console.log("started");
    const result = await Chat.updateOne(
      { _id: req.body.chatId, "lastSeen.userId": req.user.id },
      { $set: { "lastSeen.$.lastMsgId": req.body.MsgId } }
    );
    // console.log("result", result);
    res.send("Ok");
  } catch (error) {
    res.send("error from backend");
  }
});

router.post("/lastMsgId", fetchuser, async (req, res) => {
  try {
    console.log("started");
    const lstMsgId = await Chat.findOne(
      { _id: req.body.chatId, "lastSeen.userId": req.user.id },
      { "lastSeen.$": 1 }
    );
    // console.log(lstMsgId.lastSeen[0].lastMsgId.toString());
    // res.send(lstMsgId.users[0].lastMsgId.toString());
    const CountUnseen = await Message.find({
      chat: req.body.chatId,
      _id: { $gt: lstMsgId.lastSeen[0].lastMsgId.toString() },
    }).count();
    // console.log("CountUnseen", CountUnseen);
    res.json({
      cnt: CountUnseen,
      lastMsgId: lstMsgId.lastSeen[0].lastMsgId.toString(),
    });
  } catch (error) {
    res.send("error from backend");
  }
});

router.post("/udteLstMsg", fetchuser, async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.body.chatId });
    // console.log("from chat", chat);
    const result = await Chat.updateOne(
      { _id: req.body.chatId, "lastSeen.userId": req.user.id },
      { $set: { "lastSeen.$.lastMsgId": chat.latestMessage } }
    );
    // console.log("result", result);
    res.send("Ok");
  } catch (error) {
    res.send("some error from backend");
  }
});

router.get("/allMessage/:chatId", fetchuser, async (req, res) => {
  const message = await Message.find({ chat: req.params.chatId })
    .sort({ createdAt: -1 })
    .skip((req.query.page - 1) * 5)
    .limit(5)
    .populate("sender", "name pic email")
    .populate("chat");
  console.log(message);
  res.json(message);
});

router.get("/allMessageApp/:chatId", fetchuser, async (req, res) => {
  console.log("page", req.query.page);
  console.log("from req.params", req.params);

  const message = await Message.find({
    chat: req.params.chatId,
  })
    .sort({ createdAt: -1 })
    .skip((req.query.page - 1) * 10)
    .limit(10)
    .populate("sender", "name pic email")
    .populate("chat");

  res.json(message);
});
router.get("/allUnseenMessageApp/:chatId", async (req, res) => {
  // console.log("page", req.query.page);
  // console.log("from req.params", req.params);
  console.log("from unread messages");
  if (req.query.page == 1) {
    const message = await Message.find({
      chat: req.params.chatId,
      _id: { $gt: req.query.msgId },
    })
      .sort({ createdAt: -1 })
      // .skip((req.query.page - 1) * 10)
      // .limit(10)
      .populate("sender", "name pic email")
      .populate("chat");

    const message2 = await Message.find({
      chat: req.params.chatId,
      _id: { $lte: req.query.msgId },
    })
      .sort({ createdAt: -1 })
      .skip((req.query.page - 1) * 10)
      .limit(10)
      .populate("sender", "name pic email")
      .populate("chat");

    // console.log("total message", { ...message2, ...message });

    res.json({ message, message2 });
  } else {
    const message = await Message.find({
      chat: req.params.chatId,
      _id: { $lte: req.query.msgId },
    })
      .sort({ createdAt: -1 })
      .skip((req.query.page - 1) * 10)
      .limit(10)
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(message);
  }
});

module.exports = router;
