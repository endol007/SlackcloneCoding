import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ChatHeader from "../components/ChatHeader";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";
import { socket_chat } from "../socket/socket";
import { addDMChat } from "../redux/async/dm"

const Chats = (props) => {
  const dispatch = useDispatch();
  const [chat, setChat] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { currentDM, dmChat} = useSelector((state) => state.dm);
  const { getchannelsUsers } = useSelector((state)=> state.channel);
  const index = getchannelsUsers?.findIndex((p) => p.id === currentDM?.otherUserId);

  useEffect(() => {   //소켓 연결되고 채팅데이터 받아왔을때 새로운 채팅 불러오기
      socket_chat.on("receive", (data)=> {
        dispatch(addDMChat(data));
      })
  }, [socket_chat]);

  const onChangeChat = useCallback((e) => { //채팅 값 받아오기
    setChat(e.target.value);
  }, []);

  const onSubmitChat = useCallback((e) => {
    const dmChatData = {
      dmsId: currentDM?.dmsId,
      userId: currentUser.id,
      chat: chat,
    };

      socket_chat.emit("chat", dmChatData); // 소켓으로 채팅 데이터 보내기
      
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
        <ChatList chatData={dmChat}></ChatList>
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
