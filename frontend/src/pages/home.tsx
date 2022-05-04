import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { WebSocketContext } from "../WebSocketProvider";
import { GET_RECORDINGS } from "../WebSocketProvider/messages";
import WaveForm from "../components/WaveForm";
import RecordingList from "../components/RecordingList";
import Grid from "@mui/material/Grid";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export const Home = () => {
  const ws = useContext(WebSocketContext);
  const [selectedFile, setSelectedFile] = useState('');

  const onStart = () => {
    ws?.startRecording();
  };

  const onStop = () => {
    ws?.stopRecording();
  };

  useEffect(() => {
    if (ws?.status === WebSocket.OPEN) ws.sendMessage(GET_RECORDINGS);
  }, [ws?.status]);

  const handleSelectFile = (file: string) => {
    setSelectedFile(file);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <WaveForm value={ws?.peek ? ws.peek : 0} />
      </Grid>
      <Grid item xs={12} justifyContent="center">
        <Button variant="contained" onClick={onStart}>
          Start
        </Button>
        <Button variant="contained" onClick={onStop}>
          Stop
        </Button>
      </Grid>
      <Divider />
      <Grid item xs={12} justifyContent="center">
      {selectedFile && <AudioPlayer src={"http://127.0.0.1:8000/" + selectedFile} />}
      {ws?.recordings && (
        <RecordingList
          handleSelectFile={handleSelectFile}
          recordings={ws.recordings}
          selectedFile={selectedFile}
        />
      )}
      </Grid>
    </Grid>
  );
};
