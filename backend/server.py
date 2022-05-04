import os
import json
import random

import asyncio
import websockets
from recorder import Recorder

from messages import (GET_RECORDINGS,
    GET_RECORDINGS_SUCCESS,
    START_RECORDING,
    START_RECORDING_SUCCESS,
    START_RECORDING_FAILED,
    STOP_RECORDING,
    STOP_RECORDING_SUCCESS,
    UNKNOWN_MESSAGE
)

def generate_hash_name():
    hash = random.getrandbits(128)
    return "./recordings/%032x.wav" % hash

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
            elif message == START_RECORDING:
                if recording_websocket:
                    await websocket.send(json.dumps({"success": False, "data": "The device is busy!", "message": START_RECORDING_FAILED}))
                else:
                    recording_websocket = websocket
                    await websocket.send(json.dumps({"success": True, "data": "Recording started!", "message": START_RECORDING_SUCCESS}))
                    recorder.start(websocket)

            elif message == STOP_RECORDING:
                recorder.stop(generate_hash_name())
                recording_websocket = None
                recording_arr = os.listdir('./recordings')
                recording_arr = list(filter(lambda filename: filename[-4:] == ".wav", recording_arr))
                await websocket.send(json.dumps({"success": True, "data": recording_arr, "message": STOP_RECORDING_SUCCESS}))
            else:
                await websocket.send(json.dumps({"success": False, "data": "Unknown message!", "message": UNKNOWN_MESSAGE}))

        except websockets.ConnectionClosedOK:
            if recording_websocket == websocket:
                recorder.stop(generate_hash_name())
            break
        print(message)


from file_server import start_help_server

async def main():
    async with websockets.serve(handler, "", 8001):
        print("Socket server started at localhost:" + str(8001))
        start_help_server()
        print("before gather")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
