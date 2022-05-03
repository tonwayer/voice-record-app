import React, { createContext } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

type WSType = {
  socket: W3CWebSocket,
  sendMessage: Function
}

type Props = {
  children: React.ReactNode
}

const WebSocketContext = createContext<WSType | null>(null);

export { WebSocketContext }

const WebSocketContextProvider = (props: Props) => {
  let client: W3CWebSocket, ws;

  const sendMessage = (message: any) => {
    client.send(message)
  }

  client = new W3CWebSocket('ws://localhost:8001');
  ws = {
    socket: client,
    sendMessage
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {props.children}
    </WebSocketContext.Provider>
  )
}

export default WebSocketContextProvider
