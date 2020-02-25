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
});

const PORT = process.env.PORT || 5000;
io.listen(PORT);
