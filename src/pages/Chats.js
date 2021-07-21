import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router";
import ChatHeader from "../components/ChatHeader";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";
import useSocket from "../useSocket";
import { sendDM, getDMChat } from "../redux/async/dm";
import { createDM } from "../redux/async/dm";

const Chats = () => {
  const dispatch = useDispatch();
  const { dmId } = useParams();
  const [currentDM, setCurrentDM] = useState(null);
  const [chat, setChat] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { dmChat } = useSelector((state) => state.dm);
  const [socket, disconnect] = useSocket(dmId);

  // useEffect(() => {
  //   // dispatch(getDMList({ userId: currentUser.id }));
  //   if (currentUser) {
  //     dispatch(createDM({ userId: currentUser.id, otherUserId: dmId }));
  //   }
  //   // dispatch(getDMChat({ dmsId: dmId, userId: currentUser.id }));
  // }, []);

  // useEffect(() => {
  //   if (dmList) {
  //     setCurrentDM(dmList.find((dm) => dm.dmId === dmId));
  //   }
  // }, [dmList]);

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
  }, [dmId, disconnect]);

  const onMessage = (data) => {
    if (data.SenderId === Number(dmId)) {
      console.log("전달 받은 데이터", data);
    }
  };

  const onChangeChat = useCallback((e) => {
    setChat(e.target.value);
  }, []);

  const onSubmitChat = useCallback((e) => {
    const dmChatData = {
      dmsId: dmId,
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
          placeholder={`# ${currentDM?.Dm.OtherUser?.nickname}에게 메시지 보내기`}
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
