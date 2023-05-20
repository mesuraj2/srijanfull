const express = require("express");
const router = express.Router();
const url = require("url");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("./fetchuser");
const nodemailer = require("nodemailer");
const setCookie = require("cookies-next").setCookie;

const { OAuth2Client } = require("google-auth-library");
// const { response } = require("express");
const GoogleClientId='84972645868-0amqg2uookcfd4ed1jd171hjn2hrf6cu.apps.googleusercontent.com'

const client = new OAuth2Client(GoogleClientId);


var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "znsuraj7@gmail.com",
    pass: "zgsrcafffgoobxmh",
  },
});

// //Tests
router.post("/test", async (req, res) => {
  console.log("request Incoming")
  console.log(req.body.uname,req.body.email,req.body.url,req.body.password)
  res.json({ token: "123456789", success: true});
})

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.json({ message: "Email already exists", emailExits: true, success: false });
  }
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(req.body.password, salt);
  let result = await User.create({
    name: req.body.uname,
    email: req.body.email,
    password: pass,
  });
  console.log(result)
  var mailoption = {
    from: "<znsuraj7@gmail.com>",
    to: req.body.email,
    subject: "Verify your Mail ID",
    html: `<h2> Verify your Mail ID</h2>
        <a href="${process.env.DOMAIN_URI}/email/account/${result._id}"> verify account ${req.body.uname}</a>
        `,
  };

  transporter.sendMail(mailoption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Verification Mail sent to your mail");
    }
  });
  const data = {
    user: {
      id: result.id,
    },
  };
  var token = jwt.sign(data, process.env.SECRET_KEY);
  res.json({ message: "OTP sent to your mail", token: token, success: true});
});
// for verify is it correct id

router.post("/verifyId", async (req, res) => {
  let id = req.query.id;
  const user = await User.findById(id);
  if (user) {
    return res.send({ verify: true });
  }
  res.send({ verify: false });
});

router.post("/verify", async (req, res) => {
  const userid = req.body.id ? req.body.id : req.query.id;
  const user = await User.findById(userid);  
  if (user) {
    user.isverified = true;
    await user.save();
    res.send({ success: true, message: "Suessfully Verified" });
  }
  else{
    console.log("User not found/ Malformed query id");
    res.send({ success: false, message: "Failed to Verify" });

  }
});

// for google auth
router.post("/google", async (req, res) => {
  const { tokenid } = req.body;
  client
    .verifyIdToken({
      idToken: tokenid,
      audience:GoogleClientId,
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
              // const salt = await bcrypt.genSalt(10);
              // console.log(req.body.password)
              // const password = await bcrypt.hash(req.body.password, salt);
              result = await User.create({
                name: name,
                email: email,
                password: 'googleauth',
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


//login endpoint

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ message: "Email/Password is incorrect", success: false });
    }
    if (!user.isverified) {
      return res.json({ message: "Email not verified",isverified: false });
    }
    if(user.password == 'googleauth'){
      return res.json({ message: "Please Sign in via Google", success: false });
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
