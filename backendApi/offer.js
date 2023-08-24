const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");
const message = require("../models/Message");
const offer = require("../models/offer");
const User = require("../models/users");
const categories = require("../models/categories");
const location = require("../models/location");
const fetchuser = require("./fetchuser");
const haversine = require("haversine-distance");
const { off } = require("../models/chat");
const nodeMailer = require("./nodeMailer");
const notification = require("../models/notification");
const firebase = require("firebase-admin/app");
const admin = require("firebase-admin");
// import { getMessaging } from 'firebase-admin/messaging'

//@description     Create or fetch One to One Chat
// const serviceAccount = require("./picapool-firebase-auth.json");
// firebase.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   // databaseURL: 'picapool-fba66.firebase.io',
// });
// console.log(firebase.getApp())

async function sendMessage({ tokens, notification, data }) {
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
          data: data,
          notification: notification,
          android: {
            priority: "high", // Here goes priority
            // ttl: 10 * 60 * 1000, // Time to live
          },
        })
        .then((response) => {
          // Response is a message ID string.
          console.log("Successfully sent message:", response);
        });
      // .catch((error) => {
      //   // continue;
      //   // continue
      //   console.log('Error sending message:', error);
      // });
    } catch (error) {
      console.log("Error sending message to :", tokens[i], error);
      continue;
    }
  }
}

router.post("/createcategory", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const link = req.body.link;
    let data;
    if (req.body.image) {
      data = {
        name: name,
        description: description,
        link: link,
        image: req.body.image,
      };
    } else {
      data = {
        name: name,
        description: description,
        link: link,
      };
    }
    if (name || description || link) {
      let category = await categories.findOneAndUpdate({ name: name }, data);
      if (category) {
        res.json({ message: "Category updated successfully" });
      } else {
        let result = await categories.create({
          name: name,
          image: req.body.image,
          description: description,
          link: link,
        });
        res.json({ id: result.id, message: "Category created successfully" });
      }
    } else {
      res.json({ message: "One or more required fields missing" });
    }
  } catch (err) {
    //console.log(err)
  }
});

router.get("/categories", async (req, res) => {
  try {
    let result = await categories.find();
    res.json(result);
  } catch (err) {
    //console.log(err)
  }
});

router.get("/searchoffers", async (req, res) => {
  try {
    let search = req.query.search;
    let searchquery = {
      description: {
        $text: {
          $search: search,
        },
      },
    };

    let query = await offer.find(searchquery);
    //console.log(searchquery);
  } catch (err) {
    //console.log(err);
  }
});

router.get("/categoryoffers", async (req, res) => {
  try {
    let search = req.query.search;
    let radius = Number(req.query.radius);
    let coordinte =
      req.query.lat && req.query.long
        ? [parseFloat(req.query.lat), parseFloat(req.query.long)]
        : [17.59, 78.12];
    let location =
      radius > 0
        ? {
          Location: {
            $near: {
              $geometry: { type: "Point", coordinates: coordinte },
              $maxDistance: radius,
            },
          },
        }
        : {
          Location: {
            $near: {
              $geometry: { type: "Point", coordinates: coordinte },
            },
          },
        };
    let searchquery = {
      description: {
        $text: {
          $search: search,
        },
      },
    };
    // Lets understand the code
    // so there will be list of query parameters, some of the query parameters can be handled by
    // mongodb, like color=black etc, others like page , sort are not to be handled by mongodb
    let queryObj = { ...req.query };
    const excludeFiels = [
      "page",
      "sort",
      "limit",
      "lat",
      "radius",
      "long",
      "search",
    ];
    excludeFiels.forEach((el) => delete queryObj[el]);
    const page = req.query.page ? req.query.page : 1;
    const skip = (page - 1) * 16;

    // let queryObject = search ? { ...queryObj, ...location } : { ...queryObj, ...location, ...searchquery};
    let queryObject = { ...queryObj, ...location };
    if (search) {
      queryObject = { ...queryObject, ...searchquery };
    }
    let query;
    let limit = req.query.limit ? req.query.limit : 16;
    // console.log("query", queryObject);
    // //console.log("final query")
    // if (Array.isArray(req.query.sort)) {
    //   let obj = {};
    //   req.query.sort.forEach((element) => {
    //     obj[element] = 1;
    //   });
    //   query = await offer.find(queryObject).sort(obj).limit(limit).skip(skip);
    // } else {
    //   query = await offer.find(queryObject).limit(limit).skip(skip);
    // }
    query = await offer.find(queryObject);
    res.status(200).json(query);
  } catch (error) {
    res.send(error);
  }
});

router.get("/testoffers", async (req, res) => {
  try {
    let results = { success: false, error: "Hello" };
    //console.log('New Request')
    res.json(results);
  } catch (err) {
    //console.log(err)
  }
});

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
  // //console.log(desc);
  // let locationCoor = JSON.parse(coordinate);
  // //console.log(location)
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
      chat_id: offer_chat_id,
    });

    let locationRes = await location.create({
      Location: {
        type: "Point",
        coordinates: [26.405817, 83.838554],
      },
      offer: offer1._id,
    });
    // const fullGroupChat = await offer.findOne({ _id: offer1._id });
    res.status(200).json(offer1);
  } catch (error) {
    res.send(error);
  }
});

// router.get("/offernearyou", async (req, res) => {
//   const { coordinate } = req.body;
//   let location = JSON.parse(coordinate);
//   // //console.log(typeof location);
//   try {
//     const fullGroupChat = await offer.find({
//       Location: {
//         $near: {
//           $geometry: { type: "Point", coordinates: location },
//           $maxDistance: 100000,
//         },
//       },
//     });
//     res.status(200).json(fullGroupChat);
//   } catch (error) {
//     res.send(error);
//   }
// });

// router.post("/frontpageOffer", async (req, res) => {
//   const { coordinate } = req.body;
//   let location = JSON.parse(coordinate);

//   try {
//     const cloth = await offer
//       .find({
//         Location: {
//           $near: {
//             $geometry: { type: "Point", coordinates: location },
//             $maxDistance: 100000,
//           },
//         },
//         Category: "cloth",
//       })
//       .limit(4);

//     const book = await offer
//       .find({
//         Location: {
//           $near: {
//             $geometry: { type: "Point", coordinates: location },
//             $maxDistance: 100000,
//           },
//         },
//         Category: "book",
//       })
//       .limit(5);

//     const fullGroupChat = cloth.concat(book);
//     res.status(200).json(fullGroupChat);
//   } catch (error) {
//     res.send(error);
//   }
// });

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
  try {
    // req.query.color=req.query.color.split(',')
    let coordinte =
      req.query.lat && req.query.long
        ? [parseFloat(req.query.lat), parseFloat(req.query.long)]
        : [1, 2];
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
    // //console.log(queryObject)
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

    // //console.log(obj)
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
    const radius = Number(req.body.radius);

    let coordinte = [parseFloat(req.body.lat), parseFloat(req.body.long)];
    const locationquery = {
      Location: {
        $near: {
          $geometry: { type: "Point", coordinates: coordinte },
          $maxDistance: radius,
        },
      },
    };
    let query = { _id: req.body.id };
    // query = radius ? { ...query, ...locationquery } : query;
    if (radius) {
      console.log("Radius is present");
    }
    //console.log('query check')
    //console.log(query);
    let data = await offer
      .find(query)
      .populate("chat_id", "Location chatName users");
    // //console.log(data);
    res.status(200).json(data[0]);
  } catch (error) {
    res.send(error);
  }
});

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

router.post("/aboutoffer", async (req, res) => {
  try {
    // const { lat, long } = req.query;
    console.log(req.body.id);
    try {
      const fullGroupChat = await offer.findById(req.body.id);
      console.log(fullGroupChat);
      res.json({ data: fullGroupChat });
    } catch (error) {
      console.log("error1", error);
    }
    res.json({ success: false });
  } catch (error) {
    res.send(error);
  }
});

// TODO: use locaiton collection later
// router.post("/offerchats1", async (req, res) => {
//   try {
//     const radius = req.query.radius;

//     let coordinte = [parseFloat(req.query.lat), parseFloat(req.query.long)];
//     // (req.query.lat && req.query.long) ? ([parseFloat(req.query.lat), parseFloat(req.query.long)]) : [17.59909, 78.1261523];
//     const locationquery = {
//       Location: {
//         $near: {
//           $geometry: { type: "Point", coordinates: coordinte },
//           $maxDistance: radius,
//         },
//       },
//     };
//     // const { lat, long } = req.query;
//     let query = { _id: req.body.id };
//     query = radius ? { ...query, ...locationquery } : query;
//     //console.log(query);
//     let data = await offer
//       .aggregate([query,
//          {}])

//     res.status(200).json(data[0]);
//   } catch (error) {
//     res.send(error);
//   }
// });

// Create Offer

router.post("/createappoffer", fetchuser, async (req, res) => {
  console.log(req.body);
  try {
    // let expireTime = [5, 10, 30, 45, 60];
    let distanceList = [100, 200, 500, 1000, 2000, 5000, 10000];
    let { expiry, radius } = req.body; // time in second and distance in meter
    expiry = expiry ? expiry : 300; // in second
    radius = radius ? distanceList[radius] : 20 * 1000;
    // console.log(req.body.imageArr);
    if (req.user.id) {
      if (req.body.lat || req.body.long) {
        let result = await offer.create({
          offername: req.body.offerName,
          category: req.body.category,
          brand: req.body.brand,
          image: req.body.imageArr,
          quantity: req.body.quantity,
          description: req.body.description,
          locationdescription: req.body.locationdescription,
          chat_id: [req.user.id],
          Location: {
            type: "Point",
            coordinates: [req.body.lat, req.body.long],
          },
        });

        // lets not start mailing
        // const users = await User.find({}, { email: 1 })
        // const maillist = users.map(user => user.email)

        //console.log(maillist)
        // rest stuff take fromm above. Prettfify this
        // let message = `<div>Hey Folks new new drop is here</div>
        // <div>Name: ${req.body.offerName}</div>
        // `
        // for (var i in maillist) {
        //   nodeMailer(maillist[i], message, "New Drop")
        // }

        categories
          .findOne({ name: req.body.category })
          .exec(async (err, category) => {
            if (err) {
            } else {
              if (category) {
              } else {
                let result2 = await categories.create({
                  name: req.body.category,
                  image: req.body.imageArr[0],
                  description: `Latest Collection of ${req.body.category}`,
                  link: req.body.category,
                });
              }
            }
          });

        const createofferchat = await Chat.create({
          chatName: req.body.offerName,
          users: req.user.id,
          isGroupChat: true,
          isOfferChat: true,
          admin: req.user.id,
          offerid: result._id,
          expireAt: new Date(new Date().getTime() + 1000 * 60 * expiry),
          Location: {
            type: "Point",
            coordinates: [req.body.lat, req.body.long],
          },
        });
        console.log("created offer");

        let locationres = await location.create({
          Location: {
            type: "Point",
            coordinates: [req.body.lat, req.body.long],
          },
          chat: createofferchat._id,
        });
        console.log("created locatin");
        const user = await location
          .find(
            {
              Location: {
                $near: {
                  $geometry: {
                    type: "Point",
                    coordinates: [req.body.lat, req.body.long],
                  },
                  $maxDistance: radius,
                },
              },
              user: { $ne: null },
            },
            { user: 1 }
          )
          .populate("user");
        console.log("got users");

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
        nearusertoken = [...new Set(nearusertoken)];

        // let new_near = []
        // user.forEach((item, index)=>{
        //   if(item.user != null){
        //     if(!(item.user._id.equals(req.user.id))){
        //       new_near.push(item.user.fcmtoken)
        //     }
        //   }
        // })
        // console.log('list of fcm', new_near)
        // console.log(user,nearusers, JSON.stringify(user))
        // console.log("near usertoken", nearusertoken)
        sendMessage({
          tokens: nearusertoken,
          data: {
            title: `New Offer Chat: ${req.body.offerName}`,
            body: "Click here to join chat",
            type: 'new_offer'
          },
        });
        console.log("reached point after senfing message");
        user.forEach(async (users) => {
          try {
            if (users.user._id != req.user.id && users.user) {
              console.log("create notificationion backend");
              const notifi = await notification.create({
                chatName: req.body.offerName,
                chatId: createofferchat._id,
                expireAt: new Date(new Date().getTime() + 1000 * 60 * expiry),
                user: users.user._id.toString(),
                message: req.body.description,
              });

              await User.findByIdAndUpdate(users.user._id.toString(), {
                latestNotif: notifi._id,
              });
            }
          } catch (e) {
            console.log(e);
          }
        });
        console.log("done with notificaion in backend");
        const offerchat = await Chat.findOne({
          _id: createofferchat._id,
        }).populate("users", "-password");
        // console.log("donw wirh finding chat", offerchat);
        res.json({
          success: true,
          data: result,
          id: result._id,
          chatdetails: offerchat,
          message: "Offer created successfully",
        });
      } else {
        res.json({
          success: false,
          error: "location",
          message: "Please enable location access",
        });
      }
    } else {
      res.json({ message: "Authenticate to continue" });
    }
  } catch (err) {
    res.json({ message: "Some Error occured", error: err });
  }
});

router.post("/createoffer", fetchuser, async (req, res) => {
  console.log(req.body);
  try {
    if (req.user.id) {
      if (req.body.lat || req.body.long) {
        // let result = { _id: 12345 }
        let result = await offer.create({
          offername: req.body.offerName,
          category: req.body.category,
          brand: req.body.brand,
          image: req.body.imageArr,
          quantity: req.body.quantity,
          description: req.body.description,
          locationdescription: req.body.locationdescription,
          chat_id: [req.user.id],
          Location: {
            type: "Point",
            coordinates: [req.body.lat, req.body.long],
          },
        });
        // lets start mailing
        const users = await User.find({}, { email: 1 });
        const maillist = users.map((user) => user.email);
        //console.log(maillist)
        // rest stuff take fromm above. Prettfify this
        let message = `<div>Hey Folks new new drop is here</div>
        <div>Name: ${req.body.offerName}</div>
        `;
        for (var i in maillist) {
          nodeMailer(maillist[i], message, "New Drop");
        }
        categories
          .findOne({ name: req.body.category })
          .exec(async (err, category) => {
            if (err) {
            } else {
              //console.log(category)
              if (category) {
              } else {
                let result2 = await categories.create({
                  name: req.body.category,
                  image: req.body.imageArr[0],
                  description: `Latest Collection of ${req.body.category}`,
                  link: req.body.category,
                });
              }
            }
          });
        res.json({
          success: true,
          data: result,
          id: result._id,
          message: "Offer created successfully",
        });
      } else {
        res.json({
          success: false,
          error: "location",
          message: "Please enalble location access",
        });
      }
    } else {
      res.json({ message: "Authenticate to continue" });
    }
  } catch (err) {
    //console.log(err);
    res.json({ message: "Some Error occured" });
  }
});

module.exports = router;
