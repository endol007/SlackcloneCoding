import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ChatHeader from "../components/ChatHeader";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";
import { socket_chat } from "../socket/socket";
import { getDMChat } from "../redux/async/dm"

const Chats = (props) => {
  const dispatch = useDispatch();
  const [chat, setChat] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { currentDM, dmChat} = useSelector((state) => state.dm);
  const [socketData, setSocketData] = useState([]);
  const { getchannelsUsers } = useSelector((state)=> state.channel);
  const index = getchannelsUsers?.findIndex((p) => p.id === currentDM?.otherUserId);

  useEffect(() => {
    if (currentDM) {
      socket_chat.on("receive", (data)=> {
        setSocketData(data)
        console.log(data)
        dispatch(getDMChat({ dmsId: currentDM.dmsId, userId: currentUser.id, data:"qwe"}));
      })
    }
  }, [socket_chat, socketData, dmChat]);

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

      socket_chat.emit("chat", dmChatData);
      console.log(dmChatData);
    setChat("");
  }, [socket_chat, chat]);

  return (
    <React.Fragment>
      <ChatHeader
        current={currentDM}
        currentUsers={currentUser}
        _title={getchannelsUsers ?  getchannelsUsers[index]?.nickname: "None" }
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
