// import wss from the ws package
const { WebSocketServer } = require("ws");

const wss1 = new WebSocketServer({ port: 8080 });

let totalUser = 0;
wss1.on("connection", (socket) => {
  // if error log error
  wss1.on("error", console.error);
  console.log("server connected");

  socket.send("server connected");
  socket.send("user connected, total users:- " + totalUser);

  // client/socket connected
  totalUser++;
  console.log("user connected, total users :- " + totalUser);

  // when client/socket send message the server get all client in the server and send the message to them
  socket.on("message", (msg) => {
    console.log(msg.toString());
    wss1.clients.forEach((client) => {
      if (client !== socket) {
        client.send(msg.toString());
      }
    });
  });

  socket.on("close", () => {
    totalUser--;
    console.log("user Disconnected, total users :- " + totalUser);
    socket.send("user connected, total users:- " + totalUser);
  });
});
