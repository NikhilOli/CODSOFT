import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL)
socket.on("connect", () => {
    console.log("Client connected to server");
})
export default socket