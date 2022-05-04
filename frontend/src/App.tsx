import React from "react";
import "./App.css";
import { Home } from "./pages/home";
import WebSocketProvider from "./WebSocketProvider";
import Container from "@mui/material/Container";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <WebSocketProvider>
        <Container fixed>
          <Home />
        </Container>
      </WebSocketProvider>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
