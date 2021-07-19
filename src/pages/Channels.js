import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";

import { useParams, useDispatch, useSelector } from "react-router";
import { getChannels, getOneChannel } from "../redux/async/channel";
import useSocket from "../useSocket";
import ChatHeader from "../components/ChatHeader";
import ChatList from "../components/ChatList";
import ChatBox from "../components/ChatBox";

const Channels = (props) => {
  const dispatch = useDispatch();
  const { channel } = useParams();
  const [socket] = useSocket(channel);
  const { channelList, currentChannel } = useSelector((state) => state.channel);
  const channelData = channelList?.find((c) => c.title === channel);
  const [chat, setChat] = useState();

  useEffect(() => {
    dispatch(getChannels());
    dispatch(getOneChannel());
  }, []);

  useEffect(() => {
    socket?.on("message", onMessage);
    return () => {
      socket?.off("message", onMessage);
    };
  }, [socket]);

  const onMessage = (data) => {
    console.log("message", data);
  };

  const onChangeChat = useCallback((e) => {
    setChat(e.target.value);
  }, []);

  const onSubmitForm = useCallback((e) => {
    console.log(chat);
  }, []);

  return (
    <React.Fragment>
      <ChatHeader></ChatHeader>
      <ChannelsWrap width="100%" display="flex">
        <ChatList chatData={currentChannel}></ChatList>
        <ChatBox
          onSubmitForm={onSubmitForm}
          chat={chat}
          onChangeChat={onChangeChat}
        ></ChatBox>
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
