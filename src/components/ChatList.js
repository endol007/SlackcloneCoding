import React from "react";
import styled from "styled-components";
import gravatar from "gravatar";

const ChatList = (props) => {
  const userData = {
    email: "seanstainability@gmail.com",
    nickname: "sean",
  };

  return (
    <React.Fragment>
      <ChatListWrap>
        <ChatListBox>
          <ChatListBoxInfo>
            <ChatListUserImageWrap>
              <UserImage
                src={gravatar.url(userData.email, { s: "40px", d: "retro" })}
                alt={userData.nickname}
              ></UserImage>
            </ChatListUserImageWrap>
            <ChatListUserInfo>
              <text>사용자ID</text> <span>오후 3:16</span>
              <br />
              <div>
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
              </div>
            </ChatListUserInfo>
          </ChatListBoxInfo>
        </ChatListBox>
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
