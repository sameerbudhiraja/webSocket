import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-emerald-500">hello from ws</h1>
      </div>
    </>
  );
}

export default App;
