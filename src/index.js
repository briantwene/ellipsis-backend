const express = require("express");
const http = require("http");
const port = process.env.PORT || 3000;
const conversations = require("./conversations/router");
const messages = require("./messages/router");
const { socket } = require("./socket");
const users = require("./users/router");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.set("port", port);
app.get("/", (req, res) => {
  res.send("it work");
});

app.use("/conversations", conversations);
app.use("/messages", messages);
app.use("/users", users);

server.listen(port, () => {
  console.log(`server running on port ${port}`);

  socket(io);
});
