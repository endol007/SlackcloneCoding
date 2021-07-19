import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";

import { sendDM, getAllDM} from "../redux/async/dm";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";
import ChatHeader from "../components/ChatHeader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import useSocket from "../useSocket";

const Chats = (props) => {
  const dispatch = useDispatch();
  const { chats } = useParams();
  const [socket] = useSocket(chats);

  const dm_list = useSelector((state) => state.dm.sendDM);

  const [chat, setChat] = useState();

  useEffect(() => {
   dispatch(getAllDM());
  }, []);


  useEffect(() => {
    socket?.on("message", onMessage);
    return () => {
      socket?.off("message", onMessage);
    }
  }, [socket]);

  const onMessage = (data) => {
    console.log("message", data);
  }

  const onChangeChat = useCallback((e)=> {
    setChat(e.target.value);
  }, []);
  


  const onSubmitForm = () => {
    const dmData = {
      userId: "1",
      message: chat,
    } 
    dispatch(sendDM(dmData));
    setChat("");
  }

  return (
    <React.Fragment>
      <ChatHeader></ChatHeader>
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
