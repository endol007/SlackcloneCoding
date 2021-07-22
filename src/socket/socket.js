import io from "socket.io-client";

export const socket_workspace = io.connect("http://3.36.114.73/workspace", {
    path: '/socket.io',
    transports: ['websocket'],
});


export const socket_channel = io.connect("http://3.36.114.73/channel", {
    path: '/socket.io',
    transports: ['websocket'],
});


export const socket_chat = io.connect("http://3.36.114.73/chat", {
    path: '/socket.io',
    transports: ['websocket'],
});