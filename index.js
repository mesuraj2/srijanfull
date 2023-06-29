const Express = require("express");
const User = require("./backendApi/auth");
const connectDB = require("./backendApi/db");
const cors = require("cors");
const Chat = require("./backendApi/chat");
const Message = require("./backendApi/message");
const Notification = require("./backendApi/notification");
const upload = require("./backendApi/upload");
const Offer = require("./backendApi/offer");
const Feedback = require("./backendApi/feedback");
// let fileupload = require("express-fileupload");
const next = require("next");
const { v4 } = require("uuid");

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
    // server.use(fileupload());

    server.use("/api/auth", User);
    server.use("/api/upload", upload);
    server.use("/api/chat", Chat);
    server.use("/api/message", Message);
    server.use("/api/noti", Notification);
    server.use("/api/offer", Offer);
    server.use("/api/feedback",Feedback)

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    const server2 = server.listen(
      PORT,
      console.log(`Server running on  http://localhost:3000`)
    );

    const io = require("socket.io")(server2, {
      pingTimeout: 60000,
      cors: {
        // origin: ["www.picapool.com", "picapool.com"],
        // credentials: true,
      },
    });

    io.on("connection", (socket) => {
      // //console.log("Connected to via locally");
      socket.on("setup", (userData) => {
        // //console.log(userData);
        socket.join(userData);
        socket.emit("connected");
      });

      socket.on("join chat", (room) => {
        socket.join(room);
        // //console.log("User Joined Room: " + room);
      });
      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

      socket.on("new offerchat", (newMessageRecieved, userId) => {
        newMessageRecieved.forEach((user) => {
          if (user.user) {
            if (user.user._id == userId) return;
            socket
              .in(user.user._id)
              .emit("newChatNotification", user.user.latestNotif);
          }
        });
      });

      socket.on("new message", (newMessageRecieved) => {
        // //console.log(newMessageRecieved)
        var chat = newMessageRecieved.chat;
        if (!chat.users) return //console.log("chat.users not defined");
        chat.users.forEach((user) => {
          // //console.log(user._id);
          if (user._id == newMessageRecieved.sender._id) return;
          // //console.log("suraj")
          socket.in(user._id).emit("message recieved", newMessageRecieved);
          // socket.emit("message recieved", newMessageRecieved);
        });
      });

      socket.on('new_message', (message) => {
        console.log(`Message:${socket.id} ${message.content}`);
        socket.to(message.room).emit('recieve_message', message)
      })

      socket.on("newchat", (newMessageRecieved, userId) => {
        console.log('new message')
        newMessageRecieved.forEach((user) => {
          if (user.user) {
            if (user.user._id == userId) return;
            console.log(user.user)
            socket.in(user.user._id).emit("new_notification", user.user.latestNotif);
          }
        });
      });

      socket.off("setup", () => {
        // //console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
