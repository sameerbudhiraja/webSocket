// import wss from the ws package
const { WebSocketServer } = require("ws");

const wss1 = new WebSocketServer({ port: 8080 });

/**
 * all socket is array of obj
 * [{
 *    socket : user(WebSocket),
 *    roomId : "123123"
 * }]
 */
// all socket all users sockets stored
let allSocket = [];

// every time socket connected this event handler work for each socket connected
wss1.on("connection", (socket) => {
  // when socket send something
  socket.on("message", (msg) => {
    // msg is string here because websocket only deals with the string
    // parse message to json to read key val info
    const parsedInfo = JSON.parse(msg);
    console.log(parsedInfo + "parsed info");

    // if type is join -> join that socket user to room with given id
    if (parsedInfo.type == "join") {
      allSocket.push({
        socket,
        roomId: parsedInfo.payload.roomId,
      });
    }
    console.log("all sockets : ", allSocket);
    console.log("sockets array length", allSocket.length);

    // if type is chat -> send or boradcast message to that room by search the user room firslty
    if (parsedInfo.type == "chat") {
      // current user room == total sockets main se vo user jiska socket abhi wale socket is match hori hai uska roomid is curr user is room id
      const currUserRoom = allSocket.find(
        (user) => user.socket == socket
      ).roomId;
      const chatMsg = JSON.stringify({
        type: "chat",
        payload: {
          message: parsedInfo.payload.message,
        },
      });

      allSocket.forEach((user) => {
        if (user.roomId == currUserRoom)
          user.socket.send(chatMsg);
      });
    }
  });
});
