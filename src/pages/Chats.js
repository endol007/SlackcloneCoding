import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { sendDM, getAllDM } from "../redux/async/dm";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";
import ChatHeader from "../components/ChatHeader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import useSocket from "../useSocket";

const Chats = (props) => {
  const dispatch = useDispatch();
  const { chats } = useParams();
  const [socket] = useSocket(chats);
  // const { currentUser } = useSelector((state) => state.user);
  // const { currentDM } = useSelector((state) => state.dm);
  const currentUser = [{
    id: 1,
    nickname: "동우",
  }, {
    id: 2,
    nickname: "동환",
  }];
  const currentDM = {
    id: 1,
    title: "일반",
  };
  const [chat, setChat] = useState("");
  const dm_list = useSelector((state) => state.dm.sendDM);

  useEffect(() => {
    dispatch(getAllDM());
  }, []);

  useEffect(() => {
    socket?.on("dm", onDM);
    return () => {
      socket?.off("dm", onDM);
    };
  }, [socket]);

  const onDM = (data) => {
    console.log("message", data);
  };

  const onChangeChat = useCallback((e) => {
    setChat(e.target.value);
  }, []);

  const onSubmitForm = () => {
    const dmData = {
      dmsId: chats,
      userId: "1",
      chat: chat,
    };
    dispatch(sendDM(dmData));
    setChat("");
  };

  return (
    <React.Fragment>
      <ChatHeader current={currentDM} currentUsers={currentUser}></ChatHeader>
      <ChatsWrap width="100%" display="flex">
        <ChatList chatData={dm_list}></ChatList>
        <ChatBox
          onSubmitForm={onSubmitForm}
          chat={chat}
          onChangeChat={onChangeChat}
        ></ChatBox>
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
