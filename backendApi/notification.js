const express = require("express");
const fetchuser = require("./fetchuser");
const notification = require("../models/notification");
const router = express.Router();

router.get('/',fetchuser,async (req,res)=>{
    const result=await notification.find({user:req.user.id,seen:false})
    // console.log(result)
    res.send(result)
})

module.exports = router;
