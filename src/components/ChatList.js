import React, { useEffect } from "react";
import styled from "styled-components";
import gravatar from "gravatar";
import { useSelector } from "react-redux";

const ChatList = (props) => {
  const dm_list = useSelector((state) => state.dm.sendDM);
  const userData = {
    email: "seanstainability@gmail.com",
    nickname: "sean",
  };

  return (
    <React.Fragment>
      <ChatListWrap>
        {dm_list &&
          dm_list?.map((p, idx) => {
            return (
              <ChatListBox>
                <ChatListBoxInfo>
                  <ChatListUserImageWrap>
                    <UserImage
                      src={gravatar.url(userData.email, {
                        s: "40px",
                        d: "retro",
                      })}
                      alt={userData.nickname}
                    ></UserImage>
                  </ChatListUserImageWrap>
                  <ChatListUserInfo>
                    <text>{p.nickname}</text> <span>오후 3:16</span>
                    <br />
                    <div>{p.message}</div>
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
