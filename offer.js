const express=require('express')
const router=express.Router()
const Chat =require('./models/chat')
const User =require('./models/users')
const message =require('./models/Message')
const offer =require('./models/offer')
const fetchuser=require('./fetchuser')


router.post("/",fetchuser,async (req,res)=>{
    const {Offername,coordinate,offer_chat_id,desc,category,url}=req.body;
    console.log(desc)
    let location=JSON.parse(coordinate);
    // var locat= location.map(String)
    try {
        const offer1 = await offer.create({
            offername:Offername,
	          Category:category,
            Desc:desc,
            pic:url,
            Location:{
                type: "Point",
                coordinates: location
              },
              chat_id:offer_chat_id
          });
          const fullGroupChat = await offer.findOne({ _id: offer1._id })
          res.status(200).json(fullGroupChat);
    } catch (error) {
        res.send(error)
    }
})
router.get("/offernearyou",async (req,res)=>{
  const {coordinate}=req.body;
  let location=JSON.parse(coordinate);
  console.log(typeof(location))
    try {
          const fullGroupChat = await offer.find(
   {
     Location:
       { $near :
          {
            $geometry: { type: "Point",  coordinates: location },
            $maxDistance: 100000
          }
       }
   }
)
          res.status(200).json(fullGroupChat);
    } catch (error) {
        res.send(error)
    }
})

router.post("/frontpageOffer",async (req,res)=>{
  const {coordinate}=req.body;
  let location=JSON.parse(coordinate);

    try {
          const cloth = await offer.find(
   {
     Location:
       { $near :
          {
            $geometry: { type: "Point",  coordinates: location },
            $maxDistance: 100000
          }
       },
       Category:"cloth"
    }
    ).limit(4)

    const book = await offer.find(
        {
          Location:
            { $near :
               {
                 $geometry: { type: "Point",  coordinates: location },
                 $maxDistance: 100000
               }
            },
            Category:"book"
         }
         ).limit(5)

    const fullGroupChat=cloth.concat(book)
          res.status(200).json(fullGroupChat);
    } catch (error) {
        res.send(error)
    }
})

router.get("/topChatnearYou",async (req,res)=>{
    try {
          const fullGroupChat = await Chat.find(
   {
     Location:
       { $near :
          {
            $geometry: { type: "Point",  coordinates: [ 17.6043852, 78.1222225 ] },
            $maxDistance: 100000
          }
       }
   }
)
          res.status(200).json(fullGroupChat);
    } catch (error) {
        res.send(error)
    }
})


// specific product detail
router.get("/allOffer/",async (req,res)=>{
   let coordinte=[parseFloat(req.query.lat),parseFloat(req.query.long)]
  console.log(typeof(coordinte))
    try {
          const fullResult = await offer.find(
   {
     Location:
       { $near :
          {
            $geometry: { type: "Point",  coordinates:coordinte},
            $maxDistance: 100000
          }
       },
       Category:req.query.category
    }
    )
         res.status(200).json(fullResult);
    } catch (error) {
        res.send(error)
    }
})


router.post("/offerdetail",async (req,res)=>{
    try {
          let fullGroupChat = await offer.find({_id:req.body.id}).select("-Location").populate("chat_id","Location")
          res.status(200).json(fullGroupChat);
    } catch (error) {
        res.send(error)
    }
})


module.exports=router
