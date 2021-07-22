import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getOneChannel,
  sendMessageChannel,
} from "../redux/async/channel";
import ChatHeader from "../components/ChatHeader";
import ChatList from "../components/ChatList";
import ChatBox from "../components/ChatBox";

const Channels = (props) => {
  const dispatch = useDispatch();
  const { channel } = useParams();
  const { channelList } = useSelector((state) => state.channel);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { currentChannel } = useSelector((state) => state.channel);
  const [chat, setChat] = useState();
  const placeholder = `# ${channel}에게 메시지 보내기`;

  useEffect(() => {
    dispatch(getOneChannel(channel));
  }, [channel]);

  const onChangeChat = useCallback((e) => {
    setChat(e.target.value);
  }, []);
  const onSubmitForm = () => {
    const index = channelList?.findIndex((p) => p.id == channel);
    const channel_id = channelList[index].Channel.id;
    const ChannelMsgData = {
      channelId: channel_id,
      chat: chat,
      img: "",
      userId: currentUser.id, //userId
    };
    dispatch(sendMessageChannel(ChannelMsgData));
  };
  const index = channelList?.findIndex((p) => p.id == channel);
  const channel_title = channelList[index].Channel.title;

  return (
    <React.Fragment>
      <ChatHeader
        current={currentChannel}
        currentUsers={currentUser}
        _title={channel_title}
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
