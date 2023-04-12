const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("./fetchuser");
const nodemailer = require("nodemailer");
const setCookie = require("cookies-next").setCookie;

const { OAuth2Client } = require("google-auth-library");
// const { response } = require("express");

const client = new OAuth2Client(process.env.GoogleClientId);


var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "znsuraj7@gmail.com",
    pass: "zgsrcafffgoobxmh",
  },
});

router.post("/", async (req, res) => {
  // console.log(req.imgurl);
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.json({ message: "email already exits", emailExits: true });
  }
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(req.body.password, salt);
  let result = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: pass,
    pic: req.body.url,
  });

  var mailoption = {
    from: "<znsuraj7@gmail.com>",
    to: req.body.email,
    subject: "verify your gmail",
    html: `<h2> verify your gmail</h2>
        <a href="http://localhost:3000/email/account/${result._id}"> verify accound ${req.body.name}</a>
        `,
  };

  transporter.sendMail(mailoption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("verification send to your mail");
    }
  });
  const data = {
    user: {
      id: result.id,
    },
  };
  //    console.log(data)
  var token = await jwt.sign(data, SECRET_KEY);
  res.json({ token: token });
});
// for verify is it correct id

router.post("/verifyId", async (req, res) => {
  let id = req.query.id;
  console.log(req.query.id);
  const user = await User.findOne({ _id: id });
  if (user) {
    return res.send({ verify: true });
  }
  res.send({ verify: false });
});

router.post("/verify", async (req, res) => {
  console.log(req.query.id);
  const user = await User.findOne({ email: req.params.email });
  if (user) {
    user.isverified = true;
    await user.save();
  }
  res.send({ success: true, message: "done" });
});

// for google auth

router.post("/google", async (req, res) => {
  const { tokenid } = req.body;
  client
    .verifyIdToken({
      idToken: tokenid,
      audience: process.env.GoogleClientId,
    })
    .then((response) => {
      const { email, name, picture, email_verified } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec(async (err, user) => {
          if (err) {
          } else {
            if (user) {
              const data = {
                user: {
                  id: user._id,
                },
              };
              let token = await jwt.sign(data, process.env.SECRET_KEY);
              setCookie("authtoken", token, { req, res });
              res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
              });
            } else {
              const salt = await bcrypt.genSalt(10);
              const password = await bcrypt.hash(req.body.password, salt);
              result = await User.create({
                name: name,
                email: email,
                password,
                pic: picture,
                isverified: true,
              });
              const data = {
                user: {
                  id: result.id,
                },
              };
              //    console.log(data)
              var token = await jwt.sign(data, process.env.SECRET_KEY);
              res.json({ token: token });
            }
          }
        });
      }
    });
});

//searching the users
router.get("/searchUser", fetchuser, async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  try {
    const users = await User.find(keyword).find({ _id: { $ne: req.user.id } });
    // console.log(users)
    res.send(users);
  } catch (error) {
    res.send("error");
  }
  // console.log(keyword)
});

//login endpoint

router.post("/login", async (req, res) => {
  try {
    console.log("suraj")
    const { email, password } = req.body;
    console.log(req.body)
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ message: "enter correct data", success: false });
    }
    if (!user.isverified) {
      return res.json({ isverified: false });
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.json({ message: "enter correct data", success: false });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    var token = await jwt.sign(data, process.env.SECRET_KEY);
    setCookie("authtoken", token, { req, res });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
    });
  } catch (error) {
    res.status(500).json("internal server error");
  }
});

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findOne({ _id: userId }).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).json("internal server error");
  }
});

module.exports = router;
