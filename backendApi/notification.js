const express = require("express");
const fetchuser = require("./fetchuser");
const notification = require("../models/notification");
const router = express.Router();

router.get("/", fetchuser, async (req, res) => {
  const result = await notification.find({ user: req.user.id, seen: false });
  // console.log(result)
  res.send(result);
});

router.post("/seen",  async (req, res) => {
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

module.exports = router;
