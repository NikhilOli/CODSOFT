import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL)
socket.on("connect", () => {
    console.log("Client connected to server");
})
socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
});
export default socket