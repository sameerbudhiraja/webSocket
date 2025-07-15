// importing the webSocketServer from ws npm package
const { WebSocketServer } = require("ws");

// creating an server
const wss = new WebSocketServer({ port: 8080 }); // giving the wss port 8080

// event handler
/**
 * just like the handler in express
 * in express there is .get .put .delete method but i have only .on method
 * in express or http server there is routes like /user /admin but there is only the connection
 * in express or http server there is req and res but there is only socket where we have to send data and
 * also from where we have to recieve data
 */
wss.on("connection", (socket) => {
  // on connection run function connection
  console.log("in .on connection method");
  // socket.send("hello from first socket");
  setInterval(() => {
    socket.send("From time Intervel " + Math.floor(Math.random()));
  }, 50);

  // and now we have to make the client to talk to the server
  // in this socket connection if slient send data it will came in event
  socket.on("message", (e) => {
    console.log(e.toString());
  });
  
});

// now in above code we have created the ws server and as well as make the client talk to the server socket
