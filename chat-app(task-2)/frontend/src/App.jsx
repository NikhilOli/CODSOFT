// import { BrowserRouter } from "react-router-dom"

import { useEffect } from "react"
import socket from "./api/socket"

export default function App() {

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Client connected to server");
  // })
  // }, [])
  return (
    <h1 className="text-3xl text-green-400
     font-bold underline">
      Hello world!
    </h1>
  )
}