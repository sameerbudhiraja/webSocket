import { useEffect, useRef, useState } from "react";
import "./App.css";
// import { WebSocket } from "ws";

function App() {
  // const [count, setCount] = useState(0);
  const [messages, setmessages] = useState(["HI....", "hellow"]);
  const [inputMsg, setInputMsg] = useState("");

  const wsRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = async (e) => {
      let text;

      if (e.data instanceof Blob) {
        if (e.data.size === 0) {
          console.warn("Received empty message (empty Blob). Ignoring.");
          return;
        }
        text = await e.data.text();
      } else {
        text = e.data;
      }

      try {
        const parsed = JSON.parse(text);
        console.log("Received:", parsed.payload.message);
        setmessages((m) => [...m, parsed.payload.message]);
      } catch (err) {
        console.error("Invalid JSON:", text);
      }
    };

    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };
  }, []);

  return (
    <>
      <div className="flex-col justify-center">
        <div className="w-screen h-170 bg-gray-600">
          <br />
          {/* {messages.map((msg) => (
            <div className="m-4 p-4">
              <span className="bg-white text-black p-4 m-8">{msg}</span>
            </div>
          ))} */}
          {messages.map((msg, index) => (
            <div className="m-4 p-4" key={index}>
              <span className="bg-white text-black p-4 m-8">
                {msg.toString()}
              </span>
            </div>
          ))}
        </div>
        <input
          type="text"
          id="message"
          placeholder="type here...."
          className="bg-white w-250 h-10"
          onChange={(e) => {
            setInputMsg(e.target.value);
          }}
        />
        <button
          className="bg-green-600 rounded ml-3 mt-1 text-xl"
          onClick={() => {
            console.log();
            // const msg = document.getElementById("message").value;
            wsRef.current.send(
              JSON.stringify({
                type: "chat",
                payload: {
                  message: inputMsg,
                },
              })
            );
          }}
        >
          Send!
        </button>
      </div>
    </>
  );
}

export default App;
