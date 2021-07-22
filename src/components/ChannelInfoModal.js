import React from "react";
import { useSelector} from "react-redux";
import styled from "styled-components";
import "./modal.css";
import gravatar from "gravatar";

const ChannelInfoModal = (props) => {
  
  const { open, close, header } = props;
    const { getOneChannelUsers } = useSelector((state) => state.channel);

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
                {getOneChannelUsers?.map((user) => {
                  return (
                    <UserList>
                      <I
                        src={gravatar.url(user?.User.email, {
                          s: "28px",
                          d: "retro",
                        })}
                        alt={user?.User.nickname}
                      ></I>
                      <UserNickname>{user?.User.nickname}</UserNickname>
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
