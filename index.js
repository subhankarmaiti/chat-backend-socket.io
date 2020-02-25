const io = require("socket.io")();

// {
//   _id: 1,
//   text: "Hello developer",
//   createdAt: new Date(),
//   user: {
//     _id: 2,
//     name: "React Native",
//     avatar: "https://placeimg.com/140/140/any"
//   }
// },

io.on("connection", socket => {
  console.log("a user connected!");
  socket.on("message", message => {
    console.log(message);
    io.emit("message", message);
  });
});

const PORT = process.env.PORT || 5000;
io.listen(PORT);
