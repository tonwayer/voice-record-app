import React from "react";
import "./App.css";
import { Home } from "./pages/home";
import WebSocketProvider from "./WebSocketProvider";
import Container from "@mui/material/Container";

function App() {
  return (
    <div className="App">
      <WebSocketProvider>
        <Container fixed>
          <Home />
        </Container>
      </WebSocketProvider>
    </div>
  );
}

export default App;
