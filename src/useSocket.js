import io from "socket.io-client";
import { useCallback } from "react";

const backUrl = "localhost:8005";

const sockets = {};
const useSocket = (channel) => {
  const disconnect = useCallback(() => {
    if (channel && sockets[channel]) {
      sockets[channel].disconnect();
      delete sockets[channel];
    }
  }, [channel]);

  if (!channel) {
    return [undefined, disconnect];
  }

  if (!sockets[channel]) {
    sockets[channel] = io.connect(`${backUrl}/${channel}`, {
      transports: ["websocket"],
    });
    console.log("소켓 생성", channel, sockets[channel]);
  }

  return [sockets[channel], disconnect];
};

export default useSocket;
