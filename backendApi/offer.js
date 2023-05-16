const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");
const User = require("../models/users");
const message = require("../models/Message");
const offer = require("../models/offer");
const fetchuser = require("./fetchuser");
const haversine = require("haversine-distance");
const { off } = require("../models/chat");
// const querystring = require("querystring");

router.post("/", fetchuser, async (req, res) => {
  const {
    Offername,
    coordinate,
    offer_chat_id,
    desc,
    category,
    url,
    brand,
    quantity,
    color,
  } = req.body;
  console.log(desc);
  let location = JSON.parse(coordinate);
  // var locat= location.map(String)
  try {
    const offer1 = await offer.create({
      offername: Offername,
      category,
      description: desc,
      image: url,
      quantity,
      brand,
      color,
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

  try {
    let { coordinate,distance } = req.body;
    distance=distance? distance*1000:10*1000
    let location = JSON.parse(coordinate);
    const fullGroupChat = await offer
      .find({
        Location: {
          $near: {
            $geometry: { type: "Point", coordinates: location },
            $maxDistance: distance,
          },
        }
      })
      .limit(8);

    // const book = await offer
    //   .find({
    //     Location: {
    //       $near: {
    //         $geometry: { type: "Point", coordinates: location },
    //         $maxDistance: 100000,
    //       },
    //     },
    //     Category: "book",
    //   })
    //   .limit(5);

    // const fullGroupChat = cloth.concat(book);
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.send(error);
  }
});

// router.get("/topChatnearYou", async (req, res) => {
//   try {
//     const fullGroupChat = await Chat.find({
//       Location: {
//         $near: {
//           $geometry: { type: "Point", coordinates: [17.6043852, 78.1222225] },
//           $maxDistance: 100000,
//         },
//       },
//     });
//     res.status(200).json(fullGroupChat);
//   } catch (error) {
//     res.send(error);
//   }
// });

// specific product detail
router.get("/allOffer/", async (req, res) => {
  // console.log(req.query)
  try {
    // req.query.color=req.query.color.split(',')
    let coordinte = [parseFloat(req.query.lat), parseFloat(req.query.long)];
    let location = {
      Location: {
        $near: {
          $geometry: { type: "Point", coordinates: coordinte },
        },
      },
    };
    let queryObj = { ...req.query };
    const excludeFiels = ["page", "sort", "limit", "lat", "long"];
    excludeFiels.forEach((el) => delete queryObj[el]);
    const page = req.query.page ? req.query.page : 1;
    const skip = (page - 1) * 16;
    
    let queryObject = { ...queryObj, ...location };
    let query;
    if (Array.isArray(req.query.sort)) {
      let obj = {};
      req.query.sort.forEach((element) => {
        obj[element] = 1;
      });
      query = await offer.find(queryObject).sort(obj).limit(16).skip(skip);
    } else {
      query = await offer
        .find(queryObject)
        .sort(req.query.sort)
        .limit(16)
        .skip(skip);
    }

    // console.log(obj)
    // pagination
    // const page=req.query.page? req.query.page:0
    // const skip=(page-1)*16
    // query=query.skip(skip).limit(16)

    // const offer = await query;
    res.status(200).json(query);
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
      return b.Distance - a.Distance;
    });
    const data = JSON.stringify(distance);
    res.status(200).json({ fullGroupChat, data });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
