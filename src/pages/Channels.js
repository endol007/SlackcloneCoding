import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getChannels,
  getOneChannel,
  getOneChannelUsers,
  sendMessage,
} from "../redux/async/channel";
import useSocket from "../useSocket";
import ChatHeader from "../components/ChatHeader";
import ChatList from "../components/ChatList";
import ChatBox from "../components/ChatBox";

const Channels = (props) => {
  const dispatch = useDispatch();
  const { channel } = useParams();
  const [socket] = useSocket(channel);
  // const { currentUser } = useSelector((state) => state.user);
  // const { currentChannel, currentChannelUsers } = useSelector(
  //   (state) => state.channel
  // );
  const currentUser = {
    id: 1,
    nickname: "동우",
  };
  const currentChannel = {
    id: 1,
    title: "일반",
  };
  const currentChannelUsers = [
    {
      id: 1,
      nickname: "동우",
    },
    {
      id: 2,
      nickname: "민영",
    },
    {
      id: 3,
      nickname: "동환",
    },
  ];
  const [chat, setChat] = useState("");

  useEffect(() => {
    dispatch(getChannels());
    dispatch(getOneChannel({ channelId: channel }));
    dispatch(getOneChannelUsers({ channelId: channel }));
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

  const onSubmitForm = (e) => {
    dispatch(
      sendMessage({
        channelId: channel,
        userId: currentUser.id,
        message: chat,
      })
    );
    setChat("");
  };

  return (
    <React.Fragment>
      <ChatHeader
        current={currentChannel}
        currentUsers={currentChannelUsers}
      ></ChatHeader>
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
