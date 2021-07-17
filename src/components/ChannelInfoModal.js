import React from "react";
import styled from "styled-components";
import "./modal.css";

const ChannelInfoModal = (props) => {
    const {open, close, header} = props;
    return(
        <React.Fragment>
            <div className={open ? "openModal modal":"modal"}>
            { open ? (
                <section>
                    <header>
                        #일반
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        <UserListWrap>
                            <UserList>
                                <UserImg></UserImg>
                                <UserNickname>사용자ID</UserNickname>
                            </UserList>
                        </UserListWrap>
                        <UserListWrap>
                            <UserList>
                                <UserImg></UserImg>
                                <UserNickname>사용자ID</UserNickname>
                            </UserList>
                        </UserListWrap>
                        <UserListWrap>
                            <UserList>
                                <UserImg></UserImg>
                                <UserNickname>사용자ID</UserNickname>
                            </UserList>
                        </UserListWrap>
                        {props.children}
                    </main>
                </section>
            ) : null

            }
            </div>
        </React.Fragment>
    )
}
const UserListWrap = styled.div`
    width: 100%;
    height: 60px;
    padding: 0 16px;
`;
const UserList = styled.div`
    width: 100%;
    height: 36px;
    display: flex;
`;
const UserImg = styled.div`
    background-image: url("https://image.flaticon.com/icons/png/512/456/456212.png");
    background-size: cover;
    width: 36px;
    height: 36px;
    display: inline-block;
`;
const UserNickname = styled.div`
    margin-top: 10px;
    margin-left: 10px;

`;

export default ChannelInfoModal;