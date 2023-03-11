const Express = require("express");
const User=require('./auth')
const connectDB=require('./db')
const cors=require('cors')
const Chat=require('./chat')
const Message=require('./message')
const Offer=require('./offer')
let fileupload=require('express-fileupload')
const next = require("next");
const {v4} =require('uuid')

var Spaces = require('digitalocean-spaces')
global.fetch = require('node-fetch')

var spaces = new Spaces({
    accessKey: 'DO00HZCQ2HNXHYC82T2N',
    secretKey: 'QRGv9sAWo1/RiANRbIC3t8ZHPEGeahwQjDzV1YcqZrE',
    region: 'nyc3'
});

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {


const server = Express();

connectDB();

// server.use(cors({origin:'http://localhost:3000'}))

server.use(Express.json());
server.use(fileupload())

// server.post('/upload', async (req,res)=>{
//   const url=await generateUploadURL()
//   res.send(url)


  
  // console.log(req.files)
  // const file=req.files.pic

  // let bucket = 'poolandsave';
  //       let key = 'suraj kumar.jpg';
  //       let body = req.files.pic;

  //       let putResponse = await spaces.putObject({bucket, key, body})

  //       console.log(`put status: ${putResponse.status}`)
  //       console.log(`put response body: '${await putResponse.text()}'`)
  // // // console.log(file.name)
  // // const string=v4()
  // // const url=string+file.name.replace(/\s+/g, '-');
  // // // console.log(url)
  // // file.mv("./public/img/"+url,function(err){
  // //   if(!err){
  // //     res.send("/img/"+url)
  // //   }
  // // })
// })



server.use("/api/auth",User);
server.use("/api/chat",Chat)
server.use("/api/message",Message)
server.use("/api/offer",Offer)


server.get("*", (req, res) => {
  return handle(req, res);
});

const server2 = server.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);

const io = require("socket.io")(server2, {
  pingTimeout: 60000,
cors: {
    origin:["www.poolandsave.com","poolandsave.com"],
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to via locally");
  socket.on("setup", (userData) => {
    console.log(userData)
    socket.join(userData);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    // console.log(newMessageRecieved)
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      console.log(user._id)
      if (user._id == newMessageRecieved.sender._id) return;
      // console.log("suraj")
      socket.in(user._id).emit("message recieved", newMessageRecieved);
      // socket.emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    // console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
})
.catch(ex => {
  console.error(ex.stack);
  process.exit(1);
});
