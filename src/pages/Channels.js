import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getChannels,
  getOneChannel,
  sendMessageChannel,
  getOneChannelUsers,
  getchannelsUsers
} from "../redux/async/channel";
import { getUser } from "../redux/async/user";
import useSocket from "../useSocket";
import ChatHeader from "../components/ChatHeader";
import ChatList from "../components/ChatList";
import ChatBox from "../components/ChatBox";

const Channels = (props) => {
  const dispatch = useDispatch();
  const { channel } = useParams();
  const { channelList } = useSelector((state) => state.channel);

  const [socket] = useSocket(channel);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { currentChannel } = useSelector((state) => state.channel);
  const [chat, setChat] = useState();
  const placeholder = `# ${channel}에게 메시지 보내기`;

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    dispatch(getOneChannel(channel));
    dispatch(getOneChannelUsers(channel));
    dispatch(getchannelsUsers());
    dispatch(getChannels());
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
  const onSubmitForm = () => {
    const index = channelList?.findIndex((p) => p.id == channel);
    const channel_id = channelList[index].id;
    const ChannelMsgData = {
      channelId: channel_id,
      chat: chat,
      img: "",
      userId: currentUser.id, //userId
    };
    dispatch(sendMessageChannel(ChannelMsgData));
  };

  return (
    <React.Fragment>
      <ChatHeader
        current={currentChannel}
        currentUsers={currentUser}
      ></ChatHeader>
      <ChannelsWrap width="100%" display="flex">
        <ChatList chatData={currentChannel}></ChatList>
        <ChatBox
          onSubmitForm={onSubmitForm}
          chat={chat}
          onChangeChat={onChangeChat}
          placeholder={placeholder}
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
