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

// 26.40583
// 83.83844

const categories = [
  {
    name: 'cloth',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdGhzfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    description: 'Clothing collection you would want to have in your wardrobe',
    link: 'cloth'
  },
  {
    name: 'shoes',
    description: 'Awesome shoe collection',
    link: 'shoes',
    image: 'https://media.wired.com/photos/6154ba291b38af32f7638ffd/1:1/w_1800,h_1800,c_limit/Gear-Barefoot-Shoes-Freet-Tanga-SOURCE-Freet.jpg'
  },
  {
    name: 'book',
    description: 'Books are nice!',
    link: 'book',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ3h04almsaxf756izRmUg-0nQ8_3ddgBX1iJRa7vLEg&usqp=CAU&ec=48600113'
  },
  {
    name: 'book',
    description: 'Books are nice!',
    link: 'book',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ3h04almsaxf756izRmUg-0nQ8_3ddgBX1iJRa7vLEg&usqp=CAU&ec=48600113'
  },
  {
    name: 'book',
    description: 'Books are nice!',
    link: 'book',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ3h04almsaxf756izRmUg-0nQ8_3ddgBX1iJRa7vLEg&usqp=CAU&ec=48600113'
  }
]

router.get("/categories", async (req, res) => {
  res.json(categories)
})

router.get('/searchoffers', async (req, res) => {
  try {
    let search = req.query.search
    let searchquery = {
      description: {
        $text: {
          $search: search
        }
      }
    }

    let query = await offer.find(searchquery)
    console.log(searchquery)
  }
  catch (err) {
    console.log(err)
  }
})

router.get("/categoryoffers", async (req, res) => {
  try {
    let search = req.query.search
    let radius =Number(req.query.radius)
    let coordinte = (req.query.lat && req.query.long) ? ([parseFloat(req.query.lat), parseFloat(req.query.long)]) : [26.405817, 83.838554];
    let location = radius>0 ? ({
      Location: {
        $near: {
          $geometry: { type: "Point", coordinates: coordinte },
          $maxDistance: radius,
        },
      },
    }) : ({
      Location: {
        $near: {
          $geometry: { type: "Point", coordinates: coordinte },
        },
      },
    })
    let searchquery = {
      description: {
        $text: {
          $search: search
        }
      }

    }
    // Lets understand the code
    // so there will be list of query parameters, some of the query parameters can be handled by 
    // mongodb, like color=black etc, others like page , sort are not to be handled by mongodb
    let queryObj = { ...req.query };
    console.log("from query",queryObj)
    const excludeFiels = ["page", "sort", "limit", "lat","radius", "long", "search"];
    excludeFiels.forEach((el) => delete queryObj[el]);
    const page = req.query.page ? req.query.page : 1;
    const skip = (page - 1) * 16;

    // let queryObject = search ? { ...queryObj, ...location } : { ...queryObj, ...location, ...searchquery};
    let queryObject = { ...queryObj, ...location }
    if (search) {
      queryObject = { ...queryObject, ...searchquery }
    }
    let query;
    let limit = req.query.limit ? req.query.limit : 16
    console.log("query" ,queryObject)
    if (Array.isArray(req.query.sort)) {
      let obj = {};
      req.query.sort.forEach((element) => {
        obj[element] = 1;
      });
      query = await offer.find(queryObject).sort(obj).limit(limit).skip(skip);
    } else {
      query = await offer
        .find(queryObject)
        .limit(limit)
        .skip(skip);
    }
    res.status(200).json(query);
  } catch (error) {
    res.send(error);
  }
})

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
  console.log(location)
  // var locat= location.map(String)
  try {
    // let location = JSON.parse(coordinate)? JSON.parse(coordinate):[26.405817, 83.838554];
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
        coordinates: [26.405817, 83.838554],
      },
      chat_id: offer_chat_id,
    });
    // console.log(offer1)
    // const fullGroupChat = await offer.findOne({ _id: offer1._id });
    res.status(200).json(offer1);
  } catch (error) {
    res.send(error);
  }
});

router.get("/offernearyou", async (req, res) => {
  const { coordinate } = req.body;
  let location = JSON.parse(coordinate);
  // console.log(typeof location);
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
  try {
    // req.query.color=req.query.color.split(',')
    let coordinte = (req.query.lat && req.query.long) ? ([parseFloat(req.query.lat), parseFloat(req.query.long)]) : [1, 2];
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
    // console.log(queryObject)
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


// Gets Offer chat for a particualar offer
router.post("/offerchats", async (req, res) => {
  try {
    const radius = req.query.radius

    let coordinte = [parseFloat(req.query.lat), parseFloat(req.query.long)]
    // (req.query.lat && req.query.long) ? ([parseFloat(req.query.lat), parseFloat(req.query.long)]) : [17.59909, 78.1261523];
    const locationquery = {
      Location: {
        $near: {
          $geometry: { type: "Point", coordinates: coordinte },
          $maxDistance: radius,
        },
      },
    }
    // const { lat, long } = req.query;
    let query = { _id: req.body.id }
    query = radius ? { ...query, ...locationquery } : query
    console.log(query)
    let data = await offer
    .find(query)
    .populate("chat_id", "Location chatName users");
    res.status(200).json(data[0]);
  } catch (error) {
    res.send(error)
  }
})

router.post("/offerdetail", async (req, res) => {
  try {
    // const { lat, long } = req.query;
    let fullGroupChat = await offer
      .find({ _id: req.body.id })
      .populate("chat_id", "Location chatName users");
    let chatDistacne = [];
    // if (fullGroupChat[0].chat_id) {
    //   fullGroupChat[0].chat_id.forEach((value) => {
    //     let a = [lat, long];
    //     let b = value.Location.coordinates;
    //     const dist = haversine(a, b) / 1000;
    //     let obj = {
    //       _id: value._id,
    //       chatName: value.chatName,
    //       Distance: dist,
    //     };
    //     chatDistacne.push(obj);
    //   });
    // }
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

// Create Offer
router.post('createOffer', fetchuser, async (req, res) => {
  
  let result = offer.createOne({
    offername: req.body.name,
    category: req.body.category,
    brand: req.body.brand,
    image: req.body.image,
    quantity: req.body.quantity,
    description: req.body.description,
  })
})


module.exports = router;
