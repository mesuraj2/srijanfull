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
const notification = require('./models/notification')
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
    const allowedOrigins = ['https://script.google.com', 'https://google.com'];

    const corsOptions = {
      origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    };
    // server.use(cors({origin:'http://localhost:3000'}))

    server.use(Express.json());
    server.use(cors({ corsOptions }))
    // server.use(fileupload());

    server.use("/api/auth", User);
    server.use("/api/upload", upload);
    server.use("/api/chat", Chat);
    server.use("/api/message", Message);
    server.use("/api/noti", Notification);
    server.use("/api/offer", Offer);
    server.use("/api/feedback", Feedback);

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
        origin: ["www.picapool.com", "picapool.com"],
        // credentials: true,
      },
    });

    const changeStream = notification.watch();

    io.on("connection", (socket) => {
      // //console.log("Connected to via locally");
      socket.on('setup', (room) => {
        console.log(`${socket.id} joined ${room}`);
        socket.join(room)
        socket.emit("connected");
      })

      changeStream.on('change', (change) => {
        console.log(change.fullDocument);
        if (change.operationType === 'insert') {
          socket.emit('data', change.fullDocument);
        }
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
