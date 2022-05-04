import { useContext, useEffect } from "react"
import { WebSocketContext } from "../WebSocketProvider"
import { GET_RECORDINGS } from "../WebSocketProvider/messages"

export const Home = () => {
  const ws = useContext(WebSocketContext)

  const onStart = () => {
    ws?.startRecording()
  }

  const onStop = () => {
    ws?.stopRecording("stop")
  }

  useEffect(() => {
    if (ws?.status === WebSocket.OPEN)
      ws.sendMessage(GET_RECORDINGS)
  }, [ws?.status])

  return (
    <div className="flex">
      <button onClick={onStart}>Start</button>
      <button onClick={onStop}>Stop</button>
      <ul>
        {ws?.recordings.map((record, index) => (
          <li key={index}>{record}</li>
        ))}
      </ul>
    </div>
  )
}
