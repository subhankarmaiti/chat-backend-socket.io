function createMessage(user, messageTest) {
  return {
    _id: 3,
    text: messageTest,
    createdAt: new Date(),
    user: {
      _id: user.userId,
      name: user.username,
      avatar: user.avatar
    }
  };
}

function handleMessage(socket, users) {
  socket.on("message", messageTest => {
    const user = users[socket.id];
    const message = createMessage(user, messageTest);
    socket.broadcast.emit("message", message);
  });
}
module.exports = { handleMessage };
