const io = require("socket.io")();
const messageHandler = require("./handlers/message.handler");

let userIds = {};
let currentUserId = 2;

function createUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${rand1}/${rand2}/any`;
}

io.on("connection", socket => {
  console.log("a user connected!");
  userIds[socket.id] = { userId: currentUserId++ };
  socket.on("join", username => {
    userIds[socket.id].username = username;
    userIds[socket.id].avatar = createUserAvatarUrl();
    messageHandler.handleMessage(socket, userIds);
  });
  socket.on("action", action => {
    switch (action.type) {
      case "server/hello":
        console.log("Got hello action", action.payload);
        socket.emit("action", { type: "message", data: "Good day!" });
        break;
      case "server/join":
        console.log("Git join event", action.payload);
        userIds[socket.id].username = action.payload;
        userIds[socket.id].avatar = createUserAvatarUrl();
        break;
    }
  });
});

const PORT = process.env.PORT || 5000;
io.listen(PORT);
