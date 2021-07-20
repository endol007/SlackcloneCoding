import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import "./modal.css";
import gravatar from "gravatar";
import { getOneChannelUsers } from "../redux/async/channel";

const ChannelInfoModal = (props) => {
  const dispatch = useDispatch();
  const { open, close, header, currentId } = props;
  //   const { currentChannelUsers } = useSelector((state) => state.channel);
  const currentChannelUsers = [
    {
      id: 4,
      email: "sean@gamil.com",
      nickname: "sean",
    },
    {
      id: 2,
      email: "sparta@gmail.com",
      nickname: "sparta",
    },
    {
      id: 3,
      email: "kms@gmail.com",
      nickname: "김첨지",
    },
  ];

  useEffect(() => {
    dispatch(getOneChannelUsers({ channelId: currentId }));
  }, []);

  return (
    <React.Fragment>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
              # {header}
              <button className="close" onClick={close}>
                {" "}
                &times;{" "}
              </button>
            </header>
            <main>
              <UserListWrap>
                {currentChannelUsers?.map((user) => {
                  return (
                    <UserList>
                      <I
                        src={gravatar.url(user?.email, {
                          s: "28px",
                          d: "retro",
                        })}
                        alt={user?.nickname}
                      ></I>
                      <UserNickname>{user?.nickname}</UserNickname>
                    </UserList>
                  );
                })}
              </UserListWrap>
              {props.children}
            </main>
          </section>
        ) : null}
      </div>
    </React.Fragment>
  );
};
const UserListWrap = styled.div`
  width: 80%;
  padding: 0 16px;
`;

const UserList = styled.div`
  display: flex;
  align-items: center;
`;

const UserNickname = styled.p`
  margin-left: 20px;
`;

const I = styled.img`
  width: 28px;
  height: 28px;
  display: inline-block;
`;

export default ChannelInfoModal;
