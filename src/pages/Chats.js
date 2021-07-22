import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import { useParams } from "react-router";
import ChatHeader from "../components/ChatHeader";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";
import useSocket from "../useSocket";
import { sendDM } from "../redux/async/dm";

const Chats = (props) => {
  const dispatch = useDispatch();
  // const { dmId } = useParams();
  const [chat, setChat] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { currentDM } = useSelector((state) => state.dm);
  const [socket, disconnect] = useSocket(currentDM?.dmsId);
  const { getchannelsUsers } = useSelector((state)=> state.channel);
  const index = getchannelsUsers?.findIndex((p) => p.id === currentDM?.otherUserId);
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
  }, [currentDM?.dmsId, disconnect]);

  const onMessage = (data) => {
    if (data.SenderId === Number(currentDM?.dmsId)) {
      console.log("전달 받은 데이터", data);
    }
  };

  const onChangeChat = useCallback((e) => {
    setChat(e.target.value);
  }, []);

  const onSubmitChat = useCallback((e) => {
    const dmChatData = {
      dmsId: currentDM?.dmsId,
      userId: currentUser.id,
      chat: chat,
    };
    console.log(socket);
    if (socket) {
      socket.emit("dm", dmChatData);
      console.log(dmChatData);
    }
    // dispatch(sendDM(dmChatData));
    setChat("");
  }, []);

  return (
    <React.Fragment>
      <ChatHeader
        current={currentDM}
        currentUsers={currentUser}
        _title={getchannelsUsers[index]?.nickname}
      ></ChatHeader>
      <ChatsWrap width="100%" display="flex">
        <ChatList></ChatList>
        <ChatBox
          chat={chat}
          onChangeChat={onChangeChat}
          onSubmitForm={onSubmitChat}
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
