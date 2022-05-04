import { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { WebSocketContext } from "../WebSocketProvider";
import { GET_RECORDINGS } from "../WebSocketProvider/messages";

export const Home = () => {
  const ws = useContext(WebSocketContext);

  const onStart = () => {
    ws?.startRecording();
  };

  const onStop = () => {
    ws?.stopRecording("stop");
  };

  useEffect(() => {
    if (ws?.status === WebSocket.OPEN) ws.sendMessage(GET_RECORDINGS);
  }, [ws?.status]);

  return (
    <div className="flex">
      <Button variant="contained" onClick={onStart}>
        Start
      </Button>
      <Button variant="contained" onClick={onStop}>
        Stop
      </Button>
      <Divider />
      <ul>
        {ws?.recordings.map((record, index) => (
          <li key={index}>{record}</li>
        ))}
      </ul>
    </div>
  );
};
