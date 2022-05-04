import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { WebSocketContext } from "../WebSocketProvider";
import { GET_RECORDINGS } from "../WebSocketProvider/messages";
import WaveForm from "../components/WaveForm";
import RecordingList from "../components/RecordingList";
import { FILE_SERVER_URL } from "../config";

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
        <h2>Record voice</h2>
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
      <Grid item md={5} justifyContent="center">
        <h2>Recorded lists</h2>
        {ws?.recordings
          ? <RecordingList
            handleSelectFile={handleSelectFile}
            recordings={ws.recordings}
            selectedFile={selectedFile}
          />
          : <p>No records</p>
        }
      </Grid>
      <Grid item md={7} justifyContent="center">
        <img src="/logo.svg" alt="logo" />
        {selectedFile && <AudioPlayer src={FILE_SERVER_URL + selectedFile} />}
      </Grid>
    </Grid>
  );
};
