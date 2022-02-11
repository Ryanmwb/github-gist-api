import React, { useEffect, useState } from "react";
import logo from "./SS.svg";
import "./App.css";

const App = () => {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const timer = setInterval(
      async () =>
        fetch("http://localhost:3010")
          .then(() => setConnected(true))
          .catch((e) => setConnected(false)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to the SkySpecs Software Engineer Coding Challenge</p>
        <a
          className="App-link"
          href="https://drive.google.com/file/d/1vIrNPICCYwGIkfKBKEzn6uW5BWfnhLEr/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instructions
        </a>
        <p>Your Server is {connected ? "" : "not "}running</p>
      </header>
    </div>
  );
};

export default App;
