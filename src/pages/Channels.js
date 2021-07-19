import React, { useEffect } from "react";
import styled from "styled-components";
import useSocket from "../useSocket";
import { useParams } from "react-router";

import ChatHeader from "../components/ChatHeader";
import ChatList from "../components/ChatList";
import ChatBox from "../components/ChatBox";

const Channels = (props) => {
  const { channel } = useParams();
  const [socket] = useSocket(channel);

  useEffect(() => {
    socket?.on("message", onMessage);
    return () => {
      socket?.off("dm", onMessage);
    };
  }, [socket]);

  const onMessage = (data) => {
    console.log("message", data);
  };

  return (
    <React.Fragment>
      <ChatHeader></ChatHeader>
      <ChannelsWrap width="100%" display="flex">
        <ChatList></ChatList>
        <ChatBox></ChatBox>
      </ChannelsWrap>
    </React.Fragment>
  );
};
const ChannelsWrap = styled.div`
  width: 100%;
  height: calc(100% -38px);
  display: flex;
  flex-direction: column;
`;

export default Channels;
