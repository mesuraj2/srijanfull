const express = require("express");
const fetchuser = require("./fetchuser");
const notification = require("../models/notification");
const router = express.Router();
const chat = require('../models/chat')

router.get("/", fetchuser, async (req, res) => {
  const result = await notification.find({ user: req.user.id, seen: false });
  res.send(result);
});

router.post("/seen", async (req, res) => {
  const updatedChat = await notification.findByIdAndUpdate(req.body._id, {
    seen: true,
  });
  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json({ success: true });
  }
});


router.get("/all", fetchuser, async (req, res) => {
  console.log("new Requests")
  const updatedChat = await notification.find({ user: req.user.id }).populate("chatId").populate("user", "-password")
  res.json({ success: true, chat: updatedChat });
});


router.post("/delete", fetchuser, async (req, res) => {
  const updatedChat = await notification.deleteOne({ _id: req.body.id });
  res.json({ success: true, message: 'Deleted Notification' });
});



module.exports = router;
