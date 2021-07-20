import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { getChannels, getOneChannel, sendMessageChannel, getOneChannelUsers } from "../redux/async/channel";
import { getUser } from "../redux/async/user";
import useSocket from "../useSocket";
import ChatHeader from "../components/ChatHeader";
import ChatList from "../components/ChatList";
import ChatBox from "../components/ChatBox";

const Channels = (props) => {
  const dispatch = useDispatch();
  const { channel } = useParams();
  const [socket] = useSocket(channel);
  const { currentUser } = useSelector((state) => state.user);
  const channel_list = useSelector((state)=> state.channel.channelList);
  const idx = channel_list?.findIndex((p) => p.title === channel )
  // if(channel_list[idx]){
  //   const channel_id = channel_list[idx].id;
  //   console.log(channel_id)
  //   }
  const { currentChannel, currentChannelUsers } = useSelector(
    (state) => state.channel
  );

  const [chat, setChat] = useState();
  const { sendMsg } = useSelector((state) => state.channel);
  const placeholder = `# ${channel}에게 메시지 보내기`;
  // const currentUser = {
  //   id: 1,
  //   nickname: "동우",
  // };
  // const currentChannel = {
  //   id: 1,
  //   title: "일반",
  // };
  // const currentChannelUsers = [
  //   {
  //     id: 1,
  //     nickname: "동우",
  //   },
  //   {
  //     id: 2,
  //     nickname: "민영",
  //   },
  //   {
  //     id: 3,
  //     nickname: "동환",
  //   },
  // ];
  useEffect(() => {
    dispatch(getChannels());
    dispatch(getUser());
    // dispatch(getOneChannel(channel_id));
    // dispatch(getOneChannelUsers(channel_id));
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
  const ChannelMsgData = {
    // postId: channelId,
    title: "",
    description: chat,
    img: "",
    channelId: channel,
    // userId: currentUser.id,       //userId
  }
  const onSubmitForm = () => {
    dispatch(sendMessageChannel(ChannelMsgData));
  }

  return (
    <React.Fragment>
      <ChatHeader current={currentChannel} currentUsers={currentChannelUsers}></ChatHeader>
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
