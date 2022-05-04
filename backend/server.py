import os
import json
import asyncio
import websockets
from recorder import Recorder

from messages import GET_RECORDINGS, GET_RECORDINGS_SUCCESS

async def handler(websocket):
    recording_websocket = None
    recorder = Recorder()
    while True:
        try:
            message = await websocket.recv()
            if message == GET_RECORDINGS:
                recording_arr = os.listdir('./recordings')
                recording_arr = list(filter(lambda filename: filename[-4:] == ".wav", recording_arr))
                await websocket.send(json.dumps({"success": True, "data": recording_arr, "message": GET_RECORDINGS_SUCCESS}))
            elif message == "start":
                if recording_websocket:
                    await websocket.send(json.dumps({"success": False, "data": "The device is busy!"}))
                else:
                    recording_websocket = websocket
                    await websocket.send(json.dumps({"success": True, "data": "Recording started!"}))
                    recorder.start()

            elif message == "stop":
                recorder.stop("output.wav")
                recording_websocket = None
                await websocket.send(json.dumps({"success": True, "data": "Recording ended!"}))
            else:
                await websocket.send(json.dumps({"success": False, "data": "Unknown message!"}))

        except websockets.ConnectionClosedOK:
            if recording_websocket == websocket:
                recorder.stop("output.wav")
            break
        print(message)

async def main():
    async with websockets.serve(handler, "", 8001):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
