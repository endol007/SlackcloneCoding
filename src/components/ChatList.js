import React from "react";
import styled from "styled-components";
import gravatar from "gravatar";

const ChatList = ({ chatData }) => {
  // const dummyChatData = [
  //   {
  //     User: {
  //       id: 4,
  //       nickname: "sean",
  //       email: "sean@gmail.com",
  //     },
  //     chat: "안녕",
  //     createdAt: "오후 3시 15분",
  //   },
  //   {
  //     User: {
  //       id: 2,
  //       nickname: "sparta",
  //       email: "sparta@gmail.com",
  //     },
  //     chat: "오랜만이야",
  //     createdAt: "오후 3시 16분",
  //   },
  // ];

  return (
    <React.Fragment>
      <ChatListWrap>
        {chatData?.map((p, idx) => {
          return (
            <ChatListBox>
              <ChatListBoxInfo>
                <ChatListUserImageWrap>
                  <UserImage
                    src={gravatar.url(p.User.email, {
                      s: "40px",
                      d: "retro",
                    })}
                    alt={p.User.email}
                  ></UserImage>
                </ChatListUserImageWrap>
                <ChatListUserInfo>
                  <text>{p.User.nickname}</text> <span>{p.createdAt}</span>
                  <br />
                  <div>{p.chat || p.description}</div>
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
