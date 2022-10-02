module.exports.socket = (io) => {
  const onlineUsers = {};
  io.on("connection", (socket) => {
    console.log("user has connected to the socket server");

    //for when the user logs in
    socket.on("login", (data) => {
      console.log("data", data);
      onlineUsers[data] = socket.id;
      console.log(onlineUsers);
    });

    //for one-to-one messages
    socket.on("send", (data) => {
      console.log(data);
      if (onlineUsers.hasOwnProperty(data.to)) {
        socket.to(onlineUsers[data.to]).emit("newMessage", data);
        //console.log(data.to, onlineUsers);
      } else {
        console.log("user not online");
      }
    });

    //for group messages
    socket.on("send-group", ({ members, messageObject }) => {
      console.log("members and message", members, messageObject);
      console.log("this is");
      members.forEach(({ user_id }) => {
        if (onlineUsers.hasOwnProperty(user_id)) {
          socket.to(onlineUsers[user_id]).emit("newMessage", messageObject);
          //console.log(data.to, onlineUsers);
        } else {
          //call the notification service
          console.log("user not online");
        }
      });
    });

    //when the user disconnects
    socket.on("disconnect", () => {
      console.log("user has been disconnected");
      delete onlineUsers[socket.id];
    });
  });
};
