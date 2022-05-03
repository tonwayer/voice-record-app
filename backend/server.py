import asyncio

import websockets
connected = set()
async def handler(websocket):
    global connected
    connected.add(websocket)
    while True:
        try:
            message = await websocket.recv()
            await websocket.send("hehe")
        except websockets.ConnectionClosedOK:
            connected.remove(websocket)
            break
        print(message)

async def main():
    async with websockets.serve(handler, "", 8001):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
