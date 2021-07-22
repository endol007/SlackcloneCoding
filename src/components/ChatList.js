import React, { useEffect } from "react";
import styled from "styled-components";
import gravatar from "gravatar";
import { useSelector, useDispatch } from "react-redux";
import { getDMChat } from "../redux/async/dm";

const ChatList = ({ chatData }) => {
  const dispatch = useDispatch();
  const { currentDM } = useSelector((state) => state.dm);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(()=> {
    if (currentDM) {
      dispatch(getDMChat({ dmsId: currentDM.dmsId, userId: currentUser.id, data:"abc" }));
    }
  }, [currentDM]);

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
                    <text>{p.userId}</text> <span>{p.createdAt}</span>
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
  padding: 8px 10px;
  flex-direction: rows;
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
