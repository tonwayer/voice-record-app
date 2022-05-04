import json

import pyaudio
import numpy as np
import wave
import asyncio

pAud = pyaudio.PyAudio()
# PyAudio INIT:
CHUNK = 1024  # Samples: 1024,  512, 256, 128
RATE = 44100  # Equivalent to Human Hearing at 40 kHz
INTERVAL = 1  # Sampling Interval in Seconds ie Interval to listen
CHANNELS = 1
SAMPLE_FORMAT = pyaudio.paInt16

class Recorder:
    def __init__(self):
      self.stream = None
      self.frames = []

    def start(self, websocket):

        def callback(in_data, frame_count, time_info, status):
            data = np.frombuffer(in_data, dtype=np.int16)
            self.frames.append(in_data)
            asyncio.run(websocket.send(json.dumps({"success": True, "data": int(np.amax(data)), "message": "STREAM"})))
            return (in_data, pyaudio.paContinue)

        self.stream = pAud.open(
            format=pyaudio.paInt16,
            channels=1,
            rate=RATE,
            input=True,
            frames_per_buffer=CHUNK,
            stream_callback=callback
        )
        self.stream.start_stream()


    def stop(self, filename):
        self.stream.stop_stream()
        self.stream.close()
        wf = wave.open(filename, 'wb')
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(pAud.get_sample_size(SAMPLE_FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b''.join(self.frames))
        wf.close()
        self.frames = []
