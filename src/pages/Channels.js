import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getChannels,
  getOneChannel,
  sendMessageChannel,
  getOneChannelUsers
} from "../redux/async/channel";
import {getUser} from "../redux/async/user";
import useSocket from "../useSocket";
import ChatHeader from "../components/ChatHeader";
import ChatList from "../components/ChatList";
import ChatBox from "../components/ChatBox";

const Channels = (props) => {
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const { channelList } = useSelector((state) => state.channel);
  const [socket] = useSocket(channelId);
  const { currentUser } = useSelector((state) => state.user);
  const { currentChannel } = useSelector((state) => state.channel);
  const { sendMsg } = useSelector((state) => state.channel);
  const [chat, setChat] = useState();

  const placeholder = `# ${channelId}에게 메시지 보내기`;

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
  useEffect(() => {
    dispatch(getUser())
  }, []);

  useEffect(() => {
    dispatch(getOneChannel(channelId));
    dispatch(getOneChannelUsers(channelId));
    dispatch(getChannels(currentUser));
  }, []);


  useEffect(() => {
    // if (channelList && channelList[idx]) {
    //   dispatch(getOneChannel({ channelId: channelList[idx] }));
    //   dispatch(getOneChannelUsers({ channelId: channelList[idx] }));
    // }
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
  const ChannelMsgData = {
    postId: channelId,
    title: "",
    description: chat,
    img: "",
    userId: "2", //userId
  };
  const onSubmitForm = () => {
    dispatch(sendMessageChannel(ChannelMsgData));
  };

  return (
    <React.Fragment>
      <ChatHeader
        current={currentChannel}
        currentUsers={currentChannelUsers}
      ></ChatHeader>
      <ChannelsWrap width="100%" display="flex">
        <ChatList chatData={sendMsg}></ChatList>
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
