require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const formatMessage = require("./utils/messages.js");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getUsersForGroup,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

const botName = "MDJ-Chat bot";

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("WORKS");
});

// Listen for a socket connection
io.on("connection", (socket) => {
  socket.on("join group", ({ username, group }) => {
    const user = userJoin({ id: socket.id, username, group });

    socket.join(group);

    // Welcome user
    socket.emit(
      "message",
      formatMessage({ username: botName, text: "Welcome to MDJ-Chat." })
    );

    // Broadcast when user connects
    socket.broadcast.to(group).emit(
      "message",
      formatMessage({
        username: botName,
        text: `<span class="text-blue-500 font-bold">${username}</span> has <span class="text-green-600 font-bold">joined</span> the chat.`,
      })
    );

    // Send users and group info
    io.to(group).emit('group users', {
      group,
      users: getUsersForGroup({ group })
    })
  });

  //  Listen for a chat message
  socket.on("chat message", (message) => {
    let { id, username, group } = getCurrentUser({ id: socket.id });

    io.to(group).emit("message", formatMessage({ username, text: message }));
  });

  // When client disconects
  socket.on("disconnect", () => {
    let { id, username, group } = userLeave({ id: socket.id });

    if (username) {
      io.to(group).emit(
        "message",
        formatMessage({
          username: botName,
          text: `<span class="text-blue-500 font-bold">${username}</span> has <span class="text-red-600 font-bold">left</span> the chat.`,
        })
      );

      io.to(group).emit('group users', {
        group,
        users: getUsersForGroup({ group })
      })
    }
  });
});

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
