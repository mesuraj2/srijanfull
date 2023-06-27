const express = require("express");
const fetchuser = require("./fetchuser");
const feedback = require("../models/feedback");
const router = express.Router()

router.post("/", fetchuser, async (req, res) => {
  try {
    const result = await feedback.create({
      feedback: req.body.feedback,
      user: req.user.id,
    });
    res.send({ success: true, message: "sucessfully saved" });
  } catch {
    res.send("some error occured");
  }
});

module.exports = router;
