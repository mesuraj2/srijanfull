const express = require("express");
const router = express.Router();
const url = require("url");
const User = require("../models/users");
const userVerification = require("../models/userVerification");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("./fetchuser");
const nodeMailer = require("./nodeMailer");
const setCookie = require("cookies-next").setCookie;

const { OAuth2Client } = require("google-auth-library");
const location = require("../models/location");
const GoogleClientId = "105287248693-sikcvtd0ucchi4r7g2gbceoophnmadjr.apps.googleusercontent.com"
  // "84972645868-0amqg2uookcfd4ed1jd171hjn2hrf6cu.apps.googleusercontent.com";

const client = new OAuth2Client(GoogleClientId);
// //Tests
router.post("/test", async (req, res) => {
  console.log("request Incoming");
  console.log(req.body.uname, req.body.email, req.body.url, req.body.password);
  res.json({ token: "123456789", success: true });
});

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.json({
      message: "Email already exists",
      emailExits: true,
      success: false,
    });
  }
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(req.body.password, salt);
  let result = await User.create({
    name: req.body.uname,
    email: req.body.email,
    password: pass,
  });

  let locationRes = await location.create({
    Location: {
      type: "Point",
      coordinates: [26.405817, 83.838554],
    },
    user: result._id,
  });

  // console.log(result)
  let otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  await userVerification.create({
    user: result._id,
    otp,
  });

  let message = `<div>
  <p>Welcome to Picapool.com- Your Gateway to Amazing Group Buying Deals!</p>
  <p style="font-size:1.1em">Hi,${req.body.uname}</p>
  <p>We are thrilled to welcome you to Picapool.com, your go-to platform for incredible group buying opportunities! On behalf of our entire team, I would like to express our sincere appreciation for choosing us as your preferred destination for amazing deals and savings.</p>
  <p>We're delighted that you've chosen Picapool.com as your partner in discovering exceptional group buying deals. Get ready to embark on a journey of incredible savings and unforgettable experiences!</p>
  <p>Thank you for choosing Picapool.com. Use the following OTP to complete your Sign Up procedures. OTP is valid for 3 minutes</p>
  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
  <p style="font-size:0.9em;">Best Regards,<br />Team Pica Pool</p>
  </div>`;

  nodeMailer(
    req.body.email,
    message,
    "Account Verification - One-Time Password (OTP)"
  );
  const data = {
    user: {
      id: result.id,
    },
  };
  var token = jwt.sign(data, process.env.SECRET_KEY);
  res.json({ message: "OTP sent to your mail", id: result.id, token: token, success: true });
});
// for verify is it correct id

// otp Verification
router.post("/verifyOtp", async (req, res) => {
  try {
    const { userId, otp } = req.body;
    let data = await userVerification.findOne({ user: userId });
    // need to check if the otp is present, if not tell to create again
    console.log(data)
    if (otp == data.otp) {
      const user = await User.findById(userId);
      user.isverified = true;
      await user.save();
      res.json({ success: true, message: "OTP is verified" });
    } else {
      res.json({ success: true, message: "Incorrect OTP" });
    }
  } catch (error) {
    res.send("internal server error");
  }
});

router.post("/verifyId", async (req, res) => {
  let id = req.query.id;
  const user = await User.findById(id);
  if (user) {
    return res.send({ verify: true });
  }
  res.send({ verify: false });
});

// router.post("/verify", async (req, res) => {
//   const userid = req.body.id ? req.body.id : req.query.id;
//   const user = await User.findById(userid);
//   if (user) {
//     user.isverified = true;
//     await user.save();
//     res.send({ success: true, message: "Suessfully Verified" });
//   } else {
//     console.log("User not found/ Malformed query id");
//     res.send({ success: false, message: "Failed to Verify" });
//   }
// });
// for google auth

router.post("/google", async (req, res) => {
  const { tokenid } = req.body;
  client
    .verifyIdToken({
      idToken: tokenid,
      audience: GoogleClientId,
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
                success: true,
                message: "Logging you in.."
              });
            } else {
              // const salt = await bcrypt.genSalt(10);
              // console.log(req.body.password)
              // const password = await bcrypt.hash(req.body.password, salt);
              result = await User.create({
                name: name,
                email: email,
                password: "googleauth",
                pic: picture,
                isverified: true,
              });

              let locationRes = await location.create({
                Location: {
                  type: "Point",
                  coordinates: [26.405817, 83.838554],
                },
                user: result._id,
              });

              const data = {
                user: {
                  id: result.id,
                },
              };
              //    console.log(data)
              var token = await jwt.sign(data, process.env.SECRET_KEY);
              res.json({ token: token, success: true, message: "Successfully created account" });
            }
          }
        });
      }
    });
});

//login endpoint

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        message: "Please signup to continue",
        success: false,
      });
    }
    if (!user.isverified) {
      return res.json({ message: "Email not verified", isverified: false });
    }
    if (user.password == "googleauth") {
      return res.json({ message: "Please login in via Google", success: false });
    }
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) {
      return res.json({ message: "Password is incorrect", success: false });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    var token = jwt.sign(data, process.env.SECRET_KEY);
    setCookie("authtoken", token, { req, res });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
    });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
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
    res.send(users);
  } catch (error) {
    res.send("error");
  }
});

router.get("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findOne({ _id: userId }).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).json("internal server error");
  }
});

module.exports = router;
