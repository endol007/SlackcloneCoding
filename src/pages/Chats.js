import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import ChatHeader from "../components/ChatHeader";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";
import useSocket from "../useSocket";
import { getUser } from "../redux/async/user";
import { sendDM, getAllDM, getDmUsers } from "../redux/async/dm";

const Chats = (props) => {
  const dispatch = useDispatch();
  const { dmsId } = useParams();
  const [socket, disconnect] = useSocket(dmsId);
  const [targetDM, setTargetDM] = useState(null);
  const [chat, setChat] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { dmList, chatData } = useSelector((state) => state.dm);
  // const dm_list = useSelector((state) => state.dm.sendDM);
  // const currentDM = {
  //   id: 1,
  //   User: {
  //     id: 4,
  //     email: "sean@gamil.com",
  //     nickname: "sean",
  //   },
  //   OtherUser: {
  //     id: 2,
  //     email: "sparta@gmail.com",
  //     nickname: "sparta",
  //   },
  // };
  const placeholder = `# ${targetDM?.OtherUser?.nickname}에게 메시지 보내기`;

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (currentUser) {
      dispatch(getDmUsers({ userId: currentUser.id }));
      dispatch(getAllDM({ dmsId: dmsId, userId: currentUser.id })); // 채팅 내용
      console.log("chatData", chatData);
    }
  }, [currentUser]);

  useEffect(() => {
    if (dmList) {
      setTargetDM(dmList.find((dm) => dm.id === dmsId));
    }
  }, [dmList]);

  useEffect(() => {
    if (targetDM && currentUser && socket) {
      const dmData = {
        dmsId: dmsId,
        userId: currentUser.id,
        chat: chat,
      };
      socket.emit("dm", dmData);
    }
  }, [socket, currentUser, targetDM]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [dmsId, disconnect]);

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
      <ChatHeader current={targetDM} currentUsers={currentUser}></ChatHeader>
      <ChatsWrap width="100%" display="flex">
        <ChatList chatData={chatData}></ChatList>
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
