import React from "react";
import styled from "styled-components";

import ChatHeader from "../components/ChatHeader";
import ChatList from "../components/ChatList";
import ChatBox from "../components/ChatBox";

const Channels = (props) => {
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
