import React, { useEffect } from "react";
import styled from "styled-components";
import gravatar from "gravatar";
import { useSelector } from "react-redux";

const ChatList = ({ chatData }) => {
  // const { currentUser } = useSelector((state) => state.user);
  const currentUser = {
    id: 1,
    email: "seanstainability@gmail.com",
    nickname: "sean",
  };
  

  return (
    <React.Fragment>
      <ChatListWrap>
        {chatData?.map((p, idx) => {
          return (
            <ChatListBox>
              <ChatListBoxInfo>
                <ChatListUserImageWrap>
                  <UserImage
                    src={gravatar.url(currentUser.email, {
                      s: "40px",
                      d: "retro",
                    })}
                    alt={currentUser.nickname}
                  ></UserImage>
                </ChatListUserImageWrap>
                <ChatListUserInfo>
                  <text>{p.userId}</text> <span>{chatData.createdAt}</span>
                  <br />
                  <div>{p.chat}</div>
                </ChatListUserInfo>
              </ChatListBoxInfo>
            </ChatListBox>
          );
        })}
      </ChatListWrap>
    </React.Fragment>
  );
};

const ChatListWrap = styled.div`
  height: 75vh;
  display: grid;
  grid-template-rows: 10% 90%;
  overflow-y: scroll;
`;
const ChatListBox = styled.div`
  margin-bottom: 16px;
`;
const ChatListBoxInfo = styled.div`
  display: flex;
  padding: 8px 20px;
  flex-direction: rows;
`;
const ChatListUserImageWrap = styled.div``;
const UserImage = styled.img``;
const ChatListUserInfo = styled.div`
  margin-left: 10px;
  & > text {
    font-size: 15px;
  }
  & > span {
    font-size: 12px;
    color: rgba(var(--sk_foreground_max_solid, 97, 96, 97), 1);
  }
  & > div {
    padding-top: 8px;
  }
`;

export default ChatList;
