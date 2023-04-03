const express = require("express");
const router = express.Router();
const Chat = require("./models/chat");
const User = require("./models/users");
const message = require("./models/Message");
const offer = require("./models/offer");
const fetchuser = require("./fetchuser");

//@description     Create or fetch One to One Chat
router.post("/", fetchuser, async (req, res) => {
  const { UserId } = req.body;
  // console.log(req.user.id)

  var ischat = await Chat.find({
    isGroupChat: false,
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

  // const result=await Chat.create({

  // })
  // console.log(result)
  // res.send(result._id)
});

//@description     Create New offer Chat
router.post("/offerchat", fetchuser, async (req, res) => {
  const { chatName, offerid, coordinate } = req.body;
  let location = JSON.parse(coordinate);
  // console.log(chatName,offerid,location)
  try {
    const groupChat = await Chat.create({
      chatName: chatName,
      users: req.user.id,
      isOfferChat: true,
      isGroupChat: true,
      Location: {
        type: "Point",
        coordinates: location,
      },
      offerid: offerid,
    });
    await offer.findByIdAndUpdate({ _id: offerid }, { chat_id: groupChat._id });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate(
      "users",
      "-password"
    );
    //   .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     fetgroupchat to Chat
router.post("/fetchgroupChat", fetchuser, async (req, res) => {
  const { ChatId } = req.body;
  // console.log(req.user.id)
  var ischat = await Chat.find({
    _id: ChatId,
  })
    .populate("users", "-password")
    .populate("latestMessage");

  ischat = await User.populate(ischat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  // console.log(ischat)
  res.send(ischat[0]);
});

//@description     Create New Group Chat
router.post("/group", fetchuser, async (req, res) => {
  // const {user,chatName}=req.body;

  try {
    var users = JSON.parse(req.body.users);
  } catch (error) {
    res.send(error);
  }

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user.id);
  // console.log(req.user.id)

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate(
      "users",
      "-password"
    );
    //   .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Fetch all chats for a user
router.get("/fetchChat", fetchuser, (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate("users", "-password")
      .populate("latestMessage")
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
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  ).populate("users", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

// @desc    Add user to Group / Leave
router.put("/groupadd", fetchuser, async (req, res) => {
  const { chatId, userId } = req.body;

  // let check=await Chat.find({_id:chatId,users:{$elemMatch:{$eq:userId}}})
  // if(check){
  //   return res.send('user aleady exits');
  // }
  // check if the requester is admin
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
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
  const { chatId, userId } = req.body;

  let check = await Chat.find({
    _id: chatId,
    users: { $elemMatch: { $eq: req.user.id } },
  });
  // console.log(req.user.id)
  // console.log(check.length)
  if (check.length == 1) {
    return res.send({ exits: true });
  }
  // check if the requester is admin
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: req.user.id },
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
  let {coordinate,offerid,distance}=req.body
  // coordinate=JSON.parse(coordinate)
  const data = await Chat.aggregate([
    {
      $geoNear: {
        near: { coordinates: [17.6043852, 78.1222225] },
        distanceField: "ChatDistance",
        distanceMultiplier: 1 / 1000,
        $maxDistance: 15*000,
        
      },
    },
    // { $project: { shopDistance: 1, } },
  ]);
  res.send(data);
});
module.exports = router;
