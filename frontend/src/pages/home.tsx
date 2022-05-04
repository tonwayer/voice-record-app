import { useContext, useEffect } from "react"
import { WebSocketContext } from "../WebSocket"
export const Home = () => {
  const ws = useContext(WebSocketContext)

  const onStart = () => {
    ws?.sendMessage("start")
  }

  const onStop = () => {
    ws?.sendMessage("stop")
  }

  useEffect(() => {
    if (ws) {
      ws.socket.onmessage = (message) => {
        console.log(message)
      }
    }
  })

  return (
    <div className="flex">
      <button onClick={onStart}>Start</button>
      <button onClick={onStop}>Stop</button>
    </div>
  )
}
