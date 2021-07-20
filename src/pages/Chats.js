import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import ChatHeader from "../components/ChatHeader";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";
import useSocket from "../useSocket";
import { getUser } from "../redux/async/user";
import { sendDM, getAllDM } from "../redux/async/dm";

const Chats = (props) => {
  const dispatch = useDispatch();
  const { dmsId } = useParams();
  const [socket] = useSocket(dmsId);
  const [chat, setChat] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  // const { currentDM } = useSelector((state) => state.dm);
  const dm_list = useSelector((state) => state.dm.sendDM);
  const currentDM = {
    id: 1,
    User: {
      id: 4,
      email: "sean@gamil.com",
      nickname: "sean",
    },
    OtherUser: {
      id: 2,
      email: "sparta@gmail.com",
      nickname: "sparta",
    },
  };
  const placeholder = `# ${currentDM?.OtherUser?.nickname}에게 메시지 보내기`;

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (currentUser) {
      dispatch(getAllDM({ dmsId: dmsId, userId: currentUser.id }));
      console.log("currentDM", currentDM);
    }
  }, [currentUser]);

  useEffect(() => {
    socket?.on("dm", onDM);
    return () => {
      socket?.off("dm", onDM);
    };
  }, [socket]);

  const onDM = (data) => {
    console.log("dm", data);
  };

  const onChangeChat = useCallback((e) => {
    setChat(e.target.value);
  }, []);

  const onSubmitForm = () => {
    const dmData = {
      dmsId: dmsId,
      userId: currentUser.id,
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
          chat={chat}
          onChangeChat={onChangeChat}
          onSubmitForm={onSubmitForm}
          placeholder={placeholder}
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
