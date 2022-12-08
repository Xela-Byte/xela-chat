require("dotenv").config();

const express = require("express");
const app = express();
const socket = require("socket.io");
const connectDB = require("./db/connect");
const cors = require("cors");
const Parse = require("parse/node");

const APP_ID = "KHeinsbHarryKRKud6Z8eBn4dClQeHeFZ8ShEm56";
const JAVASCRIPT_KEY = "KB1gbxcgpVgcZBQFWhSJYPOAifd94roGWNfFgmqW";

Parse.initialize(APP_ID, JAVASCRIPT_KEY);
Parse.serverURL = "https://parseapi.back4app.com/";

const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require("./routes/messagesRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get((req, res) => {
  res.staus(200).send("XelaChat!");
});

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() => {
      console.log("Connected to the DB...");
    });
    const server = app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
    const io = socket(server, {
      cors: {
        origin: "http://localhost:5000",
        credentials: true,
      },
    });

    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
      global.chatSocket = socket;
      socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
      });
      socket.on("send-message", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("message-receive", data.message);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

start();
