import React, { useEffect } from "react";
import styled from "styled-components";
import socketio from "socket.io-client";

import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";
import ChatHeader from "../components/ChatHeader";
import socket from "socket.io-client/lib/socket";

const Chats = (props) => {
  const soclet = socketio.connect("http:localhost:5000");
  const connect = (() => {
    socket.emit("init", {name: "donghwan"});

    socket.on("welcome", (msg) => {
      console.log(msg);
    });
  })();

  return (
    <React.Fragment>
      <ChatHeader></ChatHeader>
      <ChatsWrap width="100%" display="flex">
        <ChatList></ChatList>
          <ChatBox></ChatBox>
      </ChatsWrap>
    </React.Fragment>
  );
};
const ChatsWrap = styled.div`
  width: 100%;
  height: calc(100% -38px);
  display: flex;
  flex-direction: column;
`;

export default Chats;
