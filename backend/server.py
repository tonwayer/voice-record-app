import json
import asyncio
import websockets
from recorder import Recorder

async def handler(websocket):
    recording_websocket = None
    recorder = Recorder()
    while True:
        try:
            message = await websocket.recv()
            if message == "start":
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
            break
        print(message)

async def main():
    async with websockets.serve(handler, "", 8001):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
