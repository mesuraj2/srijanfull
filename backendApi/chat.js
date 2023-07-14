const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");
const User = require("../models/users");
const message = require("../models/Message");
const offer = require("../models/offer");
const fetchuser = require("./fetchuser");
const location = require("../models/location");
const notification = require("../models/notification");
const firebase = require("firebase-admin/app");
const admin = require("firebase-admin");
// import { getMessaging } from 'firebase-admin/messaging'

//@description     Create or fetch One to One Chat
const serviceAccount = require("./picapool-firebase-auth.json");
const Message = require("../models/Message");
firebase.initializeApp({
  // credential: admin.credential.applicationDefault(),
  credential: admin.credential.cert(serviceAccount),
  // serviceAccount: serviceAccount,
  // databaseURL: 'picapool-fba66.firebase.io',
});
// console.log(firebase.getApp())

async function sendMessage({ tokens, notification }) {
  // Fetch the tokens from an external datastore (e.g. database)
  // const tokens = await getTokensFromDatastore();
  console.log("sending message to ", tokens);
  // Send a message to devices with the registered tokens
  // await getMessaging().send({
  //   tokens: tokens, // ['token_1', 'token_2', ...]
  //   data: notification,
  // }).then((response) => {
  //   // Response is a message ID string.
  //   console.log('Successfully sent message:', response);
  // })
  //   .catch((error) => {
  //     console.log('Error sending message:', error);
  //   });
  for (var i = 0; i < tokens.length; i++) {
    try {
      await admin
        .messaging()
        .send({
          token: tokens[i], // ['token_1', 'token_2', ...]
          data: { hello: "world" },
          notification: notification,
          android: {
            priority: "high", // Here goes priority
            // ttl: 10 * 60 * 1000, // Time to live
          },
        })
        .then((response) => {
          // Response is a message ID string.
          console.log("Successfully sent message:", response);
        })
        .catch((error) => {
          console.log("Error sending message:", error);
        });
    } catch (error) {
      console.log("Error sending message to :", tokens[i], error);
    }
  }
}

router.post("/", fetchuser, async (req, res) => {
  const { UserId } = req.body;
  // //console.log(req.user.id)

  var ischat = await Chat.find({
    isGroupChat: false,
    isOfferChat: false,
    isCabChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: UserId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  ischat = await User.populate(ischat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (ischat.length > 0) {
    res.send(ischat[0]);
  } else {
    var chatdata = {
      chatName: "sender",
      isGroupChat: false,
      isCabChat: false,
      isOfferChat: false,
      admin: req.user.id,
      users: [req.user.id, UserId],
    };
    // const createchat=await Chat.create(chatdata)
    // const fullchat=await Chat.findOne({_id:createchat._id}).populate("users","-password")
    // res.send(fullchat)
    try {
      const createdChat = await Chat.create(chatdata);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

//@Description create new cabshare chat
router.post("/cabsharechat", fetchuser, async (req, res) => {
  try {
    // let expireTime = [5, 10, 30, 45, 60];
    let distanceList = [100, 200, 500, 1000, 2000, 5000, 10000];
    let { expiry, radius } = req.body;
    // console.log("expiry", expiry); // time in second and distance in meter
    expiry = expiry ? expiry : 300; // in second
    radius = radius ? distanceList[radius] : 20 * 1000;
    const cabsharechat = await Chat.create({
      chatName: "Cab Share",
      users: req.user.id,
      isGroupChat: true,
      isOfferChat: true,
      isCabChat: true,
      admin: req.user.id,
      lastSeen: { userId: req.user.id },
      expireAt: new Date(new Date().getTime() + 1000 * 60 * expiry),
      place: {
        from: req.body.from,
        to: req.body.to,
      },
      Location: {
        type: "Point",
        coordinates: JSON.parse(req.body.coordinate),
      },
    });
    let locationres = await location.create({
      Location: {
        type: "Point",
        coordinates: JSON.parse(req.body.coordinate),
      },
      chat: cabsharechat._id,
    });
    const user = await location
      .find(
        {
          Location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: JSON.parse(req.body.coordinate),
              },
              $maxDistance: radius,
            },
          },
          user: { $ne: null },
        },
        { user: 1 }
      )
      .populate("user");
    console.log("userdata aavailable", user);
    // let nearusers = user.map(partuser => { if(partuser.user.fcmtoken) {return partuser.user.fcmtoken} })
    let nearusertoken = user
      .map((userdata) => {
        return userdata.user;
      })
      .filter((newuserdata) => {
        return newuserdata != null && newuserdata._id != req.user.id;
      })
      .map((lo) => {
        return lo.fcmtoken;
      })
      .filter((lolo) => {
        return lolo != "";
      });

    // console.log(newuserdata);
    // console.log(user,nearusers, JSON.stringify(user))
    // console.log(JSON.stringify(user))
    // console.log("near usertoken", nearusertoken)
    sendMessage({
      tokens: nearusertoken,
      notification: { title: "New Cab Share", body: "Click here to join chat" },
    });

    user.forEach(async (users) => {
      try {
        if (users.user._id != req.user.id) {
          const notifi = await notification.create({
            chatName: "Cab share",
            chatId: cabsharechat._id,
            expireAt: new Date(new Date().getTime() + 1000 * 60 * expiry),
            user: users.user._id.toString(),
          });
          await User.findByIdAndUpdate(users.user._id.toString(), {
            latestNotif: notifi._id,
          });
        }
      } catch (e) {
        console.log("could not create notification for ", users.user);
      }
    });
    const fullCabShareChat = await Chat.findOne({
      _id: cabsharechat._id,
    }).populate("users", "-password");
    res.status(200).json(fullCabShareChat);
  } catch (error) {
    res.send({ message: "Some error from backend" });
  }
});

router.get("/cntUnsenMsg", fetchuser, async (req, res) => {

  try {
    var cnt = 0;
    const result = await Chat.find(
      {
        users: { $elemMatch: { $eq: req.user.id } },
      },
      { _id: 1 }
    );
    console.log(result);
    for (const resu of result) {
      const lstMsgId = await Chat.findOne(
        { _id: resu._id.toString(), "lastSeen.userId": req.user.id },
        { "lastSeen.$": 1 }
      );
      const CountUnseen = await Message.find({
        chat: resu._id.toString(),
        _id: { $gt: lstMsgId.lastSeen[0].lastMsgId.toString() },
      }).count();
      cnt = cnt + parseInt(CountUnseen);
    };

    res.send({ message: "working", number: cnt });
  } catch (error) {
    res.send("some error from background");
  }
});

// @description     Create New offer Chat
router.post("/offerchat", fetchuser, async (req, res) => {
  const { chatName, offerid, coordinate } = req.body;
  let locationCoor = JSON.parse(coordinate);
  // //console.log(chatName,offerid,location)
  try {
    const oldchat = await Chat.find({
      admin: req.user.id,
      isOfferChat: true,
      offerid: offerid,
    });
    // //console.log(oldchat);
    let time = 300; // in second
    if (oldchat.length > 0) {
      res.json({
        chatexists: true,
        chatdetails: oldchat[0],
        error: true,
        message: "Offer Chat already present",
      });
    } else {
      const groupChat = await Chat.create({
        chatName: chatName,
        users: req.user.id,
        isOfferChat: true,
        isGroupChat: true,
        admin: req.user.id,
        offerid: offerid,
        expireAt: new Date(new Date().getTime() + 1000 * time),
        Location: {
          type: "Point",
          coordinates: locationCoor,
        },
      });
      let locationres = await location.create({
        Location: {
          type: "Point",
          coordinates: locationCoor,
        },
        chat: groupChat._id,
      });

      const user = await location.find(
        {
          Location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: JSON.parse(req.body.coordinate),
              },
              $maxDistance: 20 * 1000,
            },
          },
          user: { $ne: null },
        },
        { user: 1 }
      );
      user.forEach(async (users) => {
        if (users.user != req.user.id) {
          const notifi = await notification.create({
            chatName: groupChat.chatName,
            chatId: groupChat._id,
            user: users.user.toString(),
          });

          await User.findByIdAndUpdate(users.user.toString(), {
            latestNotif: notifi._id,
          });
        }
      });
      await offer.findByIdAndUpdate(
        { _id: offerid },
        { $push: { chat_id: groupChat._id } }
      );
      const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate(
        "users",
        "-password"
      );
      //   .populate("groupAdmin", "-password");

      res.status(200).json(fullGroupChat);
    }
    // if (oldchat.length > 0) {
    //   res.json({
    //     chatexists: true,
    //     chatdetails: oldchat[0],
    //     error: true,
    //     message: "User has already created chat for it",
    //   });
    // } else {
    //   const groupChat = await Chat.create({
    //     chatName: chatName,
    //     users: req.user.id,
    //     isOfferChat: true,
    //     isGroupChat: true,
    //     admin: req.user.id,
    //     offerid: offerid,
    //     Location: {
    //       type: "Point",
    //       coordinates: locationCoor,
    //     },
    //   });
    //   let locationres = await location.create({
    //     Location: {
    //       type: "Point",
    //       coordinates: locationCoor,
    //     },
    //     chat: groupChat._id,
    //   });

    //   await offer.findByIdAndUpdate(
    //     { _id: offerid },
    //     { $push: { chat_id: groupChat._id } }
    //   );
    //   const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate(
    //     "users",
    //     "-password"
    //   );
    //   //   .populate("groupAdmin", "-password");

    //   res.status(200).json(fullGroupChat);
    // }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     fetgroupchat to Chat
router.post("/fetchgroupChat", fetchuser, async (req, res) => {
  const { ChatId } = req.body;
  // //console.log(req.user.id)
  var ischat = await Chat.find({
    _id: ChatId,
  })
    .populate("users", "-password")
    .populate("latestMessage");

  ischat = await User.populate(ischat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  // //console.log(ischat)
  res.send(ischat[0]);
});

router.post("/getofferdetails", fetchuser, async (req, res) => {
  const { chatId } = req.body;
  var chatdetails = await Chat.find({
    _id: chatId
  }).populate("offerid")
    .populate("admin")
  res.send(chatdetails[0])

})

//@description     Create New Group Chat
router.post("/group", fetchuser, async (req, res) => {
  // const {user,chatName}=req.body;
  // console.log("suraj");

  try {
    var users = JSON.parse(req.body.users);
  } catch (error) {
    res.send(error);
  }
  // console.log(users.length);
  // if (users.length < 2) {
  //   return res.send({
  //     success: false,
  //     message: "More than 2 users are required to form a private chat",
  //   });
  // }
  users.push(req.user.id);
  console.log(users);
  try {
    const groupChat = await Chat.create({
      admin: req.user.id,
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate(
      "users",
      "-password"
    );

    res.status(200).json({ success: true, fullGroupChat });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Fetch all chats for a user
router.get("/fetchChat", fetchuser, async (req, res) => {
  // console.log("requested Chats");
  // console.log(req.user.id);
  try {
    await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("admin")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.send(results);
      });
  } catch (error) {
    res.send(error);
  }
});

// @desc    Rename Group
router.put("/rename", fetchuser, async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  ).populate("users", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

// @desc   @desc    Remove user from Group
router.put("/groupremove", fetchuser, async (req, res) => {
  const { chatId } = req.body;

  // check if the requester is admin
  const chatData = await Chat.findOne({ _id: chatId });
  if (chatData.isCabChat) {
    await Chat.findByIdAndUpdate(chatId, {
      admin: null,
    });
  }

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: req.user.id },
    },
    {
      new: true,
    }
  ).populate("users", "-password");

  if (removed.users.length < 1) {
    await Chat.deleteOne({ _id: chatId });
    const removenotifications = await notification.deleteMany({
      chatId: chatId,
    });
    console.log(removenotifications);
  }

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

router.post("/groupremovemultiple", fetchuser, async (req, res) => {
  const { chatlist } = req.body;
  try {
    chatlist.forEach(async (chat) => {
      const removing = await Chat.findByIdAndUpdate(
        chat,
        {
          $pull: { users: req.user.id },
        },
        {
          new: true,
        }
      );
      if (removing.users.length < 1) {
        await Chat.deleteOne({ _id: chat });
      } else if (removing.admin == req.user.id) {
        Chat.findByIdAndUpdate(chat, { admin: removing.users[0] });
      }
    });
    res.json({ success: true, message: "Successfully removed chats" });
  } catch (e) {
    res.json({ message: "Some Error has occuered", error: e });
  }
});

router.post("/deletechat", fetchuser, async (req, res) => {
  const { chatId } = req.body;
  console.log(chatId, req.user.id);
  const chat = await Chat.find({ _id: chatId });
  if (chat.length > 0) {
    console.log(chat);
    if (chat[0].admin == req.user.id) {
      await Chat.deleteOne({ _id: chatId });
      res.json({ sucess: true, message: "Chat deleted successfully" });
    }
  }

  const removenotifications = await notification.deleteMany({ chatId: chatId });
  console.log(removenotifications);

  if (!chat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(chat);
  }
});

// @desc    Add user to Group / Leave
router.put("/groupadd", async (req, res) => {
  const { chatId, userId } = req.body;

  // let check = await Chat.find({_id:chatId,users:{$elemMatch:{$eq:userId}}})
  // if(check){
  //   return res.send('user aleady exits');
  // }
  // check if the requester is admin
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId, lastSeen: { userId } },
    },
    {
      new: true,
    }
  ).populate("users", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

// @desc    Add user to Group / Leave
router.put("/groupaddOffer", fetchuser, async (req, res) => {
  const { chatId } = req.body;

  let check = await Chat.find({
    _id: chatId,
    users: { $elemMatch: { $eq: req.user.id } },
  });
  // //console.log(req.user.id)
  // //console.log(check.length)
  if (check.length == 1) {
    return res.send({ exits: true });
  }
  // check if the requester is admin
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: req.user.id, lastSeen: { userId: req.user.id } },
    },
    {
      new: true,
    }
  ).populate("users", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

router.get("/getChatDistance", async (req, res) => {
  let { coordinate, offerid, distance } = req.body;
  // coordinate=JSON.parse(coordinate)
  const data = await Chat.aggregate([
    {
      $geoNear: {
        near: { coordinates: coordinate },
        distanceField: "ChatDistance",
        distanceMultiplier: 1 / 1000,
        $maxDistance: 15 * 1000,
      },
    },
    // { $project: { shopDistance: 1, } },
  ]);
  res.send(data);
});

module.exports = router;
