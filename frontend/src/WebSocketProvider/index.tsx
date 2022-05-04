import React, { createContext, useEffect, useState, useMemo } from "react";

import {
  GET_RECORDINGS_SUCCESS,
  START_RECORDING,
  STOP_RECORDING,
  STREAM,
} from "./messages";
import { SOCKET_SERVER_URL } from "../config";

type WSContextType = {
  socket: WebSocket;
  status: number;
  recordings: Array<string>;
  peek: number;
  sendMessage: Function;
  getRecordings: Function;
  startRecording: Function;
  stopRecording: Function;
};

type Props = {
  children: React.ReactNode;
};

const WebSocketContext = createContext<WSContextType | null>(null);

let client = new WebSocket(SOCKET_SERVER_URL);

export { WebSocketContext };

const WebSocketContextProvider = (props: Props) => {
  const [status, setStatus] = useState(client.readyState);
  const [recordings, setRecordings] = useState([]);
  const [peek, setPeek] = useState<number>(0);
  const sendMessage = (message: any) => {
    client.send(message);
  };

  const startRecording = () => {
    client.send(START_RECORDING);
  };

  const stopRecording = () => {
    client.send(STOP_RECORDING);
  };

  const getRecordings = () => {
    client.send(STOP_RECORDING);
  };

  const ws = useMemo(
    () => ({
      socket: client,
      status,
      recordings,
      peek,
      sendMessage,
      getRecordings,
      startRecording,
      stopRecording,
    }),
    [status, recordings, peek],
  );

  useEffect(() => {
    if (client.readyState !== status) setStatus(client.readyState);

    client.addEventListener("open", () => {
      setStatus(WebSocket.OPEN);
    });

    client.addEventListener("close", () => {
      setStatus(WebSocket.CLOSED);
    });

    client.onmessage = (message) => {
      const payload = JSON.parse(message.data);
      if (payload.success === false) {
        console.log(payload)
      }
      switch (payload.message) {
        case GET_RECORDINGS_SUCCESS:
          setRecordings(payload.data);
          break;
        case STREAM:
          setPeek(payload.data);
          break;
        default:
          break;
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={ws}>
      {props.children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContextProvider;
