export const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER
  ? "ws://" + process.env.REACT_APP_SOCKET_SERVER
  : "ws://127.0.0.1:8001"

export const FILE_SERVER_URL = process.env.REACT_APP_FILE_SERVER
  ? process.env.REACT_APP_FILE_SERVER + "/recordings/"
  : "http://127.0.0.1:8000/recordings/"
