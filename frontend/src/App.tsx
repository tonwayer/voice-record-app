import React from 'react';
import './App.css';
import { Home } from './pages/home';
import WebSocketProvider from './WebSocket';

function App() {
  return (
    <div className="App">
      <WebSocketProvider>
        <Home />
      </WebSocketProvider>
    </div>
  );
}

export default App;
