import React from "react";
import styled from "styled-components";
import gravatar from "gravatar";

const ChatList = (props) => {
    const userData = {
        email: "seanstainability@gmail.com",
        nickname: "sean",
      };

    return(
        <React.Fragment>
            <ChatListWrap> 
                <ChatListBox>
                    <ChatListBoxInfo>
                        <ChatListUserImageWrap>
                            <UserImage 
                                src={gravatar.url(userData.email, { s: "40px", d: "retro" })}
                                alt={userData.nickname}>
                            </UserImage>
                        </ChatListUserImageWrap>
                        
                    </ChatListBoxInfo>
                </ChatListBox>
            </ChatListWrap>
        </React.Fragment>
    )
}

const ChatListWrap = styled.div`
    overflow: auto;
    width: 100%;
    height: 80vh;
    display: grid;
    grid-template-rows: 10% 90%;
`;
const ChatListBox = styled.div`
    position: absolute;
    width: 100%;
    margin-bottom: 16px;
`;
const ChatListBoxInfo = styled.div`
    display: flex;
    padding: 8px 20px;
    flex-direction: rows;
`;
const ChatListUserImageWrap = styled.div`

`;
const UserImage = styled.img`

`;

export default ChatList;