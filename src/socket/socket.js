import io from "socket.io-client";

export const socket_workspace = io.connect("http://localhost:8005/workspace", {
    path: '/socket.io',
    transports: ['websocket'],
});


export const socket_channel = io.connect("http://localhost:8005/channel", {
    path: '/socket.io',
    transports: ['websocket'],
});


export const socket_chat = io.connect("http://localhost:8005/chat", {
    path: '/socket.io',
    transports: ['websocket'],
});