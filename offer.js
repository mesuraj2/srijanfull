const express = require("express");
const router = express.Router();
const Chat = require("./models/chat");
const User = require("./models/users");
const message = require("./models/Message");
const offer = require("./models/offer");
const fetchuser = require("./fetchuser");
const haversine = require("haversine-distance");

router.post("/", fetchuser, async (req, res) => {
  const { Offername, coordinate, offer_chat_id, desc, category, url } =
    req.body;
  console.log(desc);
  let location = JSON.parse(coordinate);
  // var locat= location.map(String)
  try {
    const offer1 = await offer.create({
      offername: Offername,
      Category: category,
      Desc: desc,
      pic: url,
      Location: {
        type: "Point",
        coordinates: location,
      },
      chat_id: offer_chat_id,
    });
    const fullGroupChat = await offer.findOne({ _id: offer1._id });
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.send(error);
  }
});
router.get("/offernearyou", async (req, res) => {
  const { coordinate } = req.body;
  let location = JSON.parse(coordinate);
  console.log(typeof location);
  try {
    const fullGroupChat = await offer.find({
      Location: {
        $near: {
          $geometry: { type: "Point", coordinates: location },
          $maxDistance: 100000,
        },
      },
    });
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.send(error);
  }
});

router.post("/frontpageOffer", async (req, res) => {
  const { coordinate } = req.body;
  let location = JSON.parse(coordinate);

  try {
    const cloth = await offer
      .find({
        Location: {
          $near: {
            $geometry: { type: "Point", coordinates: location },
            $maxDistance: 100000,
          },
        },
        Category: "cloth",
      })
      .limit(4);

    const book = await offer
      .find({
        Location: {
          $near: {
            $geometry: { type: "Point", coordinates: location },
            $maxDistance: 100000,
          },
        },
        Category: "book",
      })
      .limit(5);

    const fullGroupChat = cloth.concat(book);
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.send(error);
  }
});

router.get("/topChatnearYou", async (req, res) => {
  try {
    const fullGroupChat = await Chat.find({
      Location: {
        $near: {
          $geometry: { type: "Point", coordinates: [17.6043852, 78.1222225] },
          $maxDistance: 100000,
        },
      },
    });
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.send(error);
  }
});

// specific product detail
router.get("/allOffer/", async (req, res) => {
  let coordinte = [parseFloat(req.query.lat), parseFloat(req.query.long)];
  console.log(typeof coordinte);
  try {
    const fullResult = await offer.find({
      Location: {
        $near: {
          $geometry: { type: "Point", coordinates: coordinte },
          $maxDistance: 100000,
        },
      },
      //  Category:req.query.category
    });
    res.status(200).json(fullResult);
  } catch (error) {
    res.send(error);
  }
});

router.post("/offerdetail", async (req, res) => {
  try {
    const { lat, long } = req.query;
    let fullGroupChat = await offer
      .find({ _id: req.body.id })
      .populate("chat_id", "Location chatName");
    let chatDistacne = [];
    if (fullGroupChat[0].chat_id) {
      fullGroupChat[0].chat_id.forEach((value) => {
        let a = [lat, long];
        let b = value.Location.coordinates;
        const dist = haversine(a, b) / 1000;
        let obj = {
          _id: value._id,
          chatName: value.chatName,
          Distance: dist,
        };
        chatDistacne.push(obj);
      });
    }
    let distance = chatDistacne.slice(0);
    distance.sort(function (a, b) {
      return  b.Distance-a.Distance
    });
    const data = JSON.stringify(distance);
    res.status(200).json({ fullGroupChat, data });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
