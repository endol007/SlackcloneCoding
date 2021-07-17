import React from "react";
import styled from "styled-components";

import Grid from "../elements/Grid";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";
import ChatHeader from "../components/ChatHeader";
const Chats = (props) => {
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
