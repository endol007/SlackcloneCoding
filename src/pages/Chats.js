import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router";
import ChatHeader from "../components/ChatHeader";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";
import useSocket from "../useSocket";
import { getUser } from "../redux/async/user";
import { sendDM, getDMChat, getDMList } from "../redux/async/dm";

const Chats = (props) => {
  const dispatch = useDispatch();
  const { dmsId } = useParams();
  const [currentDM, setCurrentDM] = useState(null);
  const [chat, setChat] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { dmList, dmChat } = useSelector((state) => state.dm);
  const [socket, disconnect] = useSocket(dmsId);
  useEffect(() => {
    // dispatch(getUser());
    if (currentUser) {
      dispatch(getDMList({ userId: currentUser.id }));
      dispatch(getDMChat({ dmsId: dmsId, userId: currentUser.id }));
    }
  }, [currentUser]);

  useEffect(() => {
    if (dmList) {
      setCurrentDM(dmList.find((dm) => dm.dmsId === dmsId));
    }
  }, [dmList]);

  useEffect(() => {
    socket?.on("dm", onMessage);
    return () => {
      socket?.off("dm", onMessage);
    };
  }, [socket]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [dmsId, disconnect]);

  const onMessage = (data) => {
    if (data.SenderId === Number(dmsId)) {
      console.log("전달 받은 데이터", data);
    }
  };

  const onChangeChat = useCallback((e) => {
    setChat(e.target.value);
  }, []);

  const onSubmitChat = useCallback((e) => {
    const dmChatData = {
      dmsId: dmsId,
      userId: currentUser.id,
      chat: chat,
    };
    if (socket) {
      socket.emit("dm", dmChatData);
    }
    dispatch(sendDM(dmChatData));
    setChat("");
  }, []);

  return (
    <React.Fragment>
      <ChatHeader current={currentDM} currentUsers={currentUser}></ChatHeader>
      <ChatsWrap width="100%" display="flex">
        <ChatList chatData={dmChat}></ChatList>
        <ChatBox
          chat={chat}
          onChangeChat={onChangeChat}
          onSubmitForm={onSubmitChat}
          placeholder={`# ${currentDM?.OtherUser?.nickname}에게 메시지 보내기`}
        ></ChatBox>
      </ChatsWrap>
    </React.Fragment>
  );
};

const ChatsWrap = styled.div`
  width: 100%;
  height: calc(100% - 38px);
  display: flex;
  flex-direction: column;
`;

export default Chats;
